package com.lakshman.Billing_Software.controller;

import com.lakshman.Billing_Software.dto.CategoryRequest;
import com.lakshman.Billing_Software.dto.CategoryResponse;
import com.lakshman.Billing_Software.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryResponse> createCategory(@RequestPart("category") String categoryString, @RequestPart("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest categoryRequest;
        try{
            categoryRequest = objectMapper.readValue(categoryString, CategoryRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryRequest, file));
        }
        catch (JsonParseException ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while parsing category json: "+ex.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> fetchAllCategories(){
        return ResponseEntity.ok().body(categoryService.fetchAllCategories());
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String categoryId){
        try{
            categoryService.deleteCategory(categoryId);
            return ResponseEntity.noContent().build();
        }
        catch(Exception ex){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
