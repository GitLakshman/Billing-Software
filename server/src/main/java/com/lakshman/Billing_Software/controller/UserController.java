package com.lakshman.Billing_Software.controller;

import com.lakshman.Billing_Software.dto.UserRequest;
import com.lakshman.Billing_Software.dto.UserResponse;
import com.lakshman.Billing_Software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        try{
           return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequest));
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User creation failed: "+ex.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        }
        catch (Exception ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User deletion failed: "+ex.getMessage());
        }
    }
}
