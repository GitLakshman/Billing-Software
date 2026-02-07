package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String userEmail;
    private String token;
    private String userRole;
}
