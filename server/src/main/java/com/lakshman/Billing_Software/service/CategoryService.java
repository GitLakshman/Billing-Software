package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.CategoryRequest;
import com.lakshman.Billing_Software.dto.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest categoryRequest, MultipartFile file);
    List<CategoryResponse> fetchAllCategories();
    void deleteCategory(String categoryId);
}
