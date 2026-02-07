package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.dto.UserRequest;
import com.lakshman.Billing_Software.dto.UserResponse;
import com.lakshman.Billing_Software.entity.UserEntity;
import com.lakshman.Billing_Software.repository.UserRepository;
import com.lakshman.Billing_Software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = covertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .userId(newUser.getUserId())
                .userRole(newUser.getUserRole())
                .userName(newUser.getUserName())
                .userEmail(newUser.getUserEmail())
                .userCreatedAt(newUser.getCreatedAt())
                .userUpdatedAt(newUser.getUpdatedAt())
                .build();
    }

    private UserEntity covertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .userEmail(request.getUserEmail())
                .userName(request.getUserName())
                .userPassword(passwordEncoder.encode(request.getUserPassword()))
                .userRole(request.getUserRole().toUpperCase())
                .build();
    }

    @Override
    public String getUserRole(String userEmail) {
        UserEntity existingUser = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + userEmail));
        return existingUser.getUserRole();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRepository.delete(existingUser);
    }
}
