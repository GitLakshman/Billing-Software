package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemRequest {
    private String itemName;
    private BigDecimal itemPrice;
    private String categoryId;
    private String itemDescription;
}
