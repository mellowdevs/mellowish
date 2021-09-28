package com.mellowdevs.mellowish.service.impl;

import com.mellowdevs.mellowish.domain.Wish;
import com.mellowdevs.mellowish.dto.CategoryDto;
import com.mellowdevs.mellowish.dto.WishDto;
import com.mellowdevs.mellowish.repository.WishRepository;
import com.mellowdevs.mellowish.service.AuthService;
import com.mellowdevs.mellowish.service.CategoryService;
import com.mellowdevs.mellowish.service.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author mellow
 */
@Service
public class WishServiceImpl implements WishService {
    @Autowired
    private WishRepository wishRepository;
    @Autowired
    private AuthService authService;
    @Autowired
    private CategoryService categoryService;


    @Override
    public List<WishDto> getAllWishes(String catId) {
        List<Wish> wishList = wishRepository.findAllByCategoryId(catId);
        return wishList.stream().map(this::mapFromWishToDto).collect(Collectors.toList());
    }

    @Override
    public WishDto getWish(String id, String catId) {
        Wish wish = wishRepository.findWishBy_idAndCategoryIdAndUsername(id, catId, getUser().getUsername());
        return mapFromWishToDto(wish);
    }

    @Override
    public WishDto updateWish(String catId, WishDto wishDto) {
        WishDto foundWishDto = getWish(wishDto.get_id(), catId);
        if(foundWishDto != null) {
            CategoryDto categoryDto = categoryService.getCategory(catId);
            List<WishDto> wishDtos = categoryDto.getWishDtos();
            List<WishDto> updatedWishDtos = wishDtos.stream().map(dto -> dto.get_id().equals(wishDto.get_id()) ? wishDto : dto).collect(Collectors.toList());
            categoryDto.setWishDtos(updatedWishDtos);
            categoryService.updateCategory(categoryDto);
            Wish updatedWish = wishRepository.save(mapFromDtoToWish(wishDto));
            return mapFromWishToDto(updatedWish);

        }
        return null;
    }

    @Override
    public WishDto deleteWish(String id, String catId) {
        CategoryDto categoryDto = categoryService.getCategory(catId);
        List<WishDto> categoryWishes = categoryDto.getWishDtos();
        categoryWishes = categoryWishes.stream().filter(dto ->{
            return !dto.get_id().equals(id);
        }).collect(Collectors.toList());
        categoryDto.setWishDtos(categoryWishes);
        categoryService.updateCategory(categoryDto);
        WishDto deletedWishDto =getWish(id, catId);
        Wish wish = wishRepository.deleteWishBy_id(id);
        return deletedWishDto;
    }

    @Override
    public void deleteAll(String catId) {
        CategoryDto categoryDto = categoryService.getCategory(catId);
        categoryDto.setWishDtos(new ArrayList<>());
        categoryService.updateCategory(categoryDto);
        wishRepository.deleteAllByCategoryIdAndUsername(catId, getUser().getUsername());

    }

    @Override
    public WishDto createWish(String categoryId, WishDto wishDto) {
        CategoryDto categoryDto = categoryService.getCategory(categoryId);
        if(categoryDto != null){
            wishDto.setCategoryId(categoryId);
            Wish wish = mapFromDtoToWish(wishDto);
            Wish savedWish = wishRepository.save(wish);
            WishDto savedWishDto = mapFromWishToDto(savedWish);
            savedWishDto.setCategoryId(categoryId);
            List<WishDto> wishDtos = categoryDto.getWishDtos();
            wishDtos.add(savedWishDto);
            categoryDto.setWishDtos(wishDtos);
            categoryService.updateCategory(categoryDto);
            return savedWishDto;
        }
        return null;
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
        if(wish != null){
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
        } else {
            return null;
        }
    }

    private User getUser() {
        return authService.getCurrentUser().orElseThrow(
                () -> new IllegalArgumentException("No user logged in"));
    }
}
