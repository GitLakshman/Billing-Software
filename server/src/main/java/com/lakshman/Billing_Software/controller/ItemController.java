package com.lakshman.Billing_Software.controller;

import com.lakshman.Billing_Software.dto.ItemRequest;
import com.lakshman.Billing_Software.dto.ItemResponse;
import com.lakshman.Billing_Software.service.ItemService;
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
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    public ResponseEntity<ItemResponse> addItem(@RequestPart("item") String itemString, @RequestPart("file") MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest;
        try{
            itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(itemService.add(itemRequest,file));
        }
        catch (JsonParseException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while parsing item json: "+e.getMessage());
        }
    }

    @GetMapping("/items")
    public ResponseEntity<List<ItemResponse>> getAllItems() {
       return ResponseEntity.ok().body(itemService.getAllItems());
    }

    @DeleteMapping("/admin/items/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable String id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item not found: "+e.getMessage());
        }
    }



}
