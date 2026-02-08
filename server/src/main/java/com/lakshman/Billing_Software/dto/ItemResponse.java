package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private String itemId;
    private String itemName;
    private BigDecimal itemPrice;
    private String categoryId;
    private String categoryName;
    private String itemImageUrl;
    private String itemDescription;
    private Timestamp itemCreatedAt;
    private Timestamp itemUpdatedAt;
}
