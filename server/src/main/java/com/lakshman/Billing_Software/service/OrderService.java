package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.OrderRequest;
import com.lakshman.Billing_Software.dto.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest orderRequest);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();
}
