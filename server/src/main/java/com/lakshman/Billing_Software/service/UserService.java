package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.UserRequest;
import com.lakshman.Billing_Software.dto.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String userEmail);
    List<UserResponse> getAllUsers();
    void deleteUser(String id);
}
