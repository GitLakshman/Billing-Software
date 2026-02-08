package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.ItemRequest;
import com.lakshman.Billing_Software.dto.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest itemRequest, MultipartFile file);
    List<ItemResponse> getAllItems();
    void deleteItem(String id);
}
