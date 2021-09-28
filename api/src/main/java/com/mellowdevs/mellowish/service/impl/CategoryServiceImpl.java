package com.mellowdevs.mellowish.service.impl;

import com.mellowdevs.mellowish.domain.Category;
import com.mellowdevs.mellowish.domain.Wish;
import com.mellowdevs.mellowish.dto.CategoryDto;
import com.mellowdevs.mellowish.dto.WishDto;
import com.mellowdevs.mellowish.repository.CategoryRepository;
import com.mellowdevs.mellowish.service.AuthService;
import com.mellowdevs.mellowish.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author mellow
 */
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private AuthService authService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category =  mapFromDtoToCategory(categoryDto);
        categoryRepository.save(category);
        return categoryDto;
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        User user = getUser();
        List<Category> categories = categoryRepository.findAllByUsername(user.getUsername());
        return categories.stream().map(this::mapFromCategoryToDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto getCategory(String id) {
        User user = getUser();
        Category category = categoryRepository.findCategoryBy_idAndUsername(id, user.getUsername());
        return mapFromCategoryToDto(category);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto) {
        String categoryId = categoryDto.get_id();
        CategoryDto foundDto = getCategory(categoryId);
        if(StringUtils.hasText(foundDto.get_id())) {
            Category category = mapFromDtoToCategory(categoryDto);
            categoryRepository.save(category);
            return categoryDto;
        } else {
            return null;
        }
    }

    @Override
    public CategoryDto deleteCategory(String id) {
        Category category = categoryRepository.deleteCategoryBy_idAndUsername(id, getUser().getUsername());
        return mapFromCategoryToDto(category);
    }

    @Override
    public void deleteAllCategories() {
        categoryRepository.deleteAllByUsername(getUser().getUsername());
    }

    private User getUser() {
        return authService.getCurrentUser().orElseThrow(
                () -> new IllegalArgumentException("No user logged in"));
    }

    private CategoryDto mapFromCategoryToDto(Category category) {
        if(category == null ){
            return null;
        }
        List<WishDto> wishDtos = new ArrayList<>();
        CategoryDto categoryDto = new CategoryDto();
        for (Wish wish: category.getWishes()) {
            wishDtos.add(mapFromWishToDto(wish));

        }
        categoryDto.set_id(category.get_id());
        categoryDto.setUsername(category.getUsername());
        categoryDto.setName(category.getName());
        categoryDto.setWishDtos(wishDtos);
        return categoryDto;
    }

    private Category mapFromDtoToCategory(CategoryDto categoryDto){
        User user = getUser();
        List<Wish> wishList = new ArrayList<>();
        for (WishDto wishDto: categoryDto.getWishDtos()) {
            wishList.add(mapFromDtoToWish(wishDto));
        }
        Category category = new Category();
        category.set_id(categoryDto.get_id());
        category.setUsername(user.getUsername());
        category.setName(categoryDto.getName());
        category.setWishes(wishList);
        return category;
    }

    private Wish mapFromDtoToWish(WishDto wishDto){
        Wish wish = new Wish();
        wish.set_id(wishDto.get_id());
        wish.setCategoryId(wishDto.getCategoryId());
        wish.setUsername(getUser().getUsername());
        wish.setTitle(wishDto.getTitle());
        wish.setDetail(wishDto.getDetail());
        wish.setPrice(wishDto.getPrice());
        wish.setUrls(wishDto.getUrls());
        wish.setImageUrls(wishDto.getImageUrls());
        return wish;
    }
    private WishDto mapFromWishToDto(Wish wish){
        WishDto wishDto = new WishDto();
        wishDto.set_id(wish.get_id());
        wishDto.setCategoryId(wish.getCategoryId());
        wishDto.setUsername(getUser().getUsername());
        wishDto.setTitle(wish.getTitle());
        wishDto.setDetail(wish.getDetail());
        wishDto.setPrice(wish.getPrice());
        wishDto.setUrls(wish.getUrls());
        wishDto.setImageUrls(wish.getImageUrls());
        return wishDto;
    }


}
