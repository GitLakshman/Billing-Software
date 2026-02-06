package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    private String userEmail;
    private String userName;
    private String userPassword;
    private String userRole;
}
