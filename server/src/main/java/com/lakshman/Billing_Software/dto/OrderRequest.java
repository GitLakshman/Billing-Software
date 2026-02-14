package com.lakshman.Billing_Software.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private String customerName;
    private String customerPhone;
    private List<OrderItemRequest> cartItems;
    private Double totalAmount;
    private Double tax;
    private Double grandTotal;
    private String paymentMethod;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemRequest{
        private String itemId;
        private String itemName;
        private Double itemPrice;
        private Integer itemsCount;
    }
}
