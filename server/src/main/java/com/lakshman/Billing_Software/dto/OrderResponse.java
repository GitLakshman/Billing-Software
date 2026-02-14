package com.lakshman.Billing_Software.dto;

import com.lakshman.Billing_Software.embeds.PaymentDetails;
import com.lakshman.Billing_Software.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private String orderId;
    private String customerName;
    private String customerPhone;
    private List<OrderItemResponse> items;
    private Double totalAmount;
    private Double tax;
    private Double grandTotal;
    private PaymentDetails paymentDetails;
    private PaymentMethod paymentMethod;
    private LocalDateTime orderCreatedAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemResponse{
        private String itemId;
        private String itemName;
        private Double itemPrice;
        private Integer itemsCount;
    }
}
