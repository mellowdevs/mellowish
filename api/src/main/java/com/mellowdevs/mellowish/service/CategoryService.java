package com.mellowdevs.mellowish.service;

import com.mellowdevs.mellowish.domain.Category;
import com.mellowdevs.mellowish.dto.CategoryDto;

import java.util.List;

/**
 * @author mellow
 */
public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);

    List<CategoryDto> getAllCategories();

    CategoryDto getCategory(String id);

    CategoryDto updateCategory(CategoryDto categoryDto);

    CategoryDto deleteCategory(String id);

    void deleteAllCategories();
}
