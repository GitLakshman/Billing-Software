package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.dto.ItemRequest;
import com.lakshman.Billing_Software.dto.ItemResponse;
import com.lakshman.Billing_Software.entity.CategoryEntity;
import com.lakshman.Billing_Software.entity.ItemEntity;
import com.lakshman.Billing_Software.repository.CategoryRepository;
import com.lakshman.Billing_Software.repository.ItemRepository;
import com.lakshman.Billing_Software.service.FileUploadService;
import com.lakshman.Billing_Software.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ItemResponse add(ItemRequest itemRequest, MultipartFile file) {
        String imageUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(itemRequest);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(itemRequest.getCategoryId())
                .orElseThrow(()-> new RuntimeException("Category not found: "+itemRequest.getCategoryId()));
        newItem.setItemCategory(existingCategory);
        newItem.setItemImageUrl(imageUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .itemName(newItem.getItemName())
                .itemPrice(newItem.getItemPrice())
                .itemDescription(newItem.getItemDescription())
                .itemImageUrl(newItem.getItemImageUrl())
                .categoryName(newItem.getItemCategory().getCategoryName())
                .categoryId(newItem.getItemCategory().getCategoryId())
                .itemCreatedAt(newItem.getItemCreatedAt())
                .itemUpdatedAt(newItem.getItemUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest itemRequest) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .itemName(itemRequest.getItemName())
                .itemPrice(itemRequest.getItemPrice())
                .itemDescription(itemRequest.getItemDescription())
                .build();
    }

    @Override
    public List<ItemResponse> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String id) {
        ItemEntity existingItem = itemRepository.findByItemId(id)
                .orElseThrow(()-> new RuntimeException("Item not found: "+id));
        boolean isFileDeleted =  fileUploadService.deleteFile(existingItem.getItemImageUrl());
        if(isFileDeleted) {
            itemRepository.delete(existingItem);
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete Image");
        }
    }
}
