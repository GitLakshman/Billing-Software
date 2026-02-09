package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.dto.CategoryRequest;
import com.lakshman.Billing_Software.dto.CategoryResponse;
import com.lakshman.Billing_Software.entity.CategoryEntity;
import com.lakshman.Billing_Software.repository.CategoryRepository;
import com.lakshman.Billing_Software.repository.ItemRepository;
import com.lakshman.Billing_Software.service.CategoryService;
import com.lakshman.Billing_Software.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest categoryRequest, MultipartFile file) {
        String imageUrl = fileUploadService.uploadFile(file);
        CategoryEntity newCategory = convertToEntity(categoryRequest);
        newCategory.setCategoryImageUrl(imageUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> fetchAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(()-> new RuntimeException("Category Not Found: "+categoryId));
        fileUploadService.deleteFile(existingCategory.getCategoryImageUrl());
        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount = itemRepository.countByItemCategoryId(newCategory.getId());
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .categoryName(newCategory.getCategoryName())
                .categoryDescription(newCategory.getCategoryDescription())
                .categoryBgColor(newCategory.getCategoryBgColor())
                .categoryImageUrl(newCategory.getCategoryImageUrl())
                .itemsCount(itemsCount)
                .categoryCreatedAt(newCategory.getCategoryCreatedAt())
                .categoryUpdatedAt(newCategory.getCategoryUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest categoryRequest) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .categoryName(categoryRequest.getCategoryName())
                .categoryDescription(categoryRequest.getCategoryDescription())
                .categoryBgColor(categoryRequest.getCategoryBgColor())
                .build();
    }
}
