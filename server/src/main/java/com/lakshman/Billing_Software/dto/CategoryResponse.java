package com.lakshman.Billing_Software.dto;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse {
    private String categoryId;
    private String categoryName;
    private String categoryDescription;
    private String categoryBgColor;
    private String categoryImageUrl;
    private Timestamp categoryCreatedAt;
    private Timestamp categoryUpdatedAt;
}
