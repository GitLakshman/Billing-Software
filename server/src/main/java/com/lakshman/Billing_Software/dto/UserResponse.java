package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String userId;
    private String userName;
    private String userEmail;
    private String userRole;
    private Timestamp userCreatedAt;
    private Timestamp userUpdatedAt;
}
