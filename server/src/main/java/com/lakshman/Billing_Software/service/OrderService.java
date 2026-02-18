package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.OrderRequest;
import com.lakshman.Billing_Software.dto.OrderResponse;
import com.lakshman.Billing_Software.dto.PaymentVerificationRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest orderRequest);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();
    OrderResponse verifyPayment(PaymentVerificationRequest paymentVerificationRequest);
    Double salesSumByDate(LocalDate date);
    Long countByOrderDate(LocalDate date);
    List<OrderResponse> findRecentOrders();
}
