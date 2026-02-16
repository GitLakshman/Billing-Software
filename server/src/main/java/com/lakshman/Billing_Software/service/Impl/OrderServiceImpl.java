package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.dto.OrderRequest;
import com.lakshman.Billing_Software.dto.OrderResponse;
import com.lakshman.Billing_Software.dto.PaymentVerificationRequest;
import com.lakshman.Billing_Software.embeds.PaymentDetails;
import com.lakshman.Billing_Software.entity.OrderEntity;
import com.lakshman.Billing_Software.entity.OrderItemEntity;
import com.lakshman.Billing_Software.enums.PaymentMethod;
import com.lakshman.Billing_Software.enums.PaymentStatus;
import com.lakshman.Billing_Software.repository.OrderRepository;
import com.lakshman.Billing_Software.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        OrderEntity newOrder = convertToOrderEntity(orderRequest);
        PaymentDetails paymentDetails = new PaymentDetails();

        assert newOrder != null;
        paymentDetails.setPaymentStatus(
                newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                        PaymentStatus.COMPLETED : PaymentStatus.PENDING
        );
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = orderRequest.getCartItems()
                .stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);

        newOrder = orderRepository.save(newOrder);

        return convertToResponse(newOrder);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .customerPhone(newOrder.getCustomerPhone())
                .totalAmount(newOrder.getTotalAmount())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .paymentDetails(newOrder.getPaymentDetails())
                .items(newOrder.getItems().stream()
                        .map(this::convertToOrderItemResponse)
                        .collect(Collectors.toList()))
                .orderCreatedAt(newOrder.getOrderCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToOrderItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .itemName(orderItemEntity.getItemName())
                .itemPrice(orderItemEntity.getItemPrice())
                .itemsCount(orderItemEntity.getItemsCount())
                .build();
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .itemName(orderItemRequest.getItemName())
                .itemPrice(orderItemRequest.getItemPrice())
                .itemsCount(orderItemRequest.getItemsCount())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest orderRequest) {
        return OrderEntity.builder()
                .customerName(orderRequest.getCustomerName())
                .customerPhone(orderRequest.getCustomerPhone())
                .totalAmount(orderRequest.getTotalAmount())
                .tax(orderRequest.getTax())
                .grandTotal(orderRequest.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(orderRequest.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        orderRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderRepository.findAllByOrderByOrderIdDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest paymentVerificationRequest) {
        OrderEntity existingOrder = orderRepository.findByOrderId(paymentVerificationRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found: " + paymentVerificationRequest.getOrderId()));

        if (!verifyRazorpaySignature(paymentVerificationRequest.getRazorpayOrderId(),
                paymentVerificationRequest.getRazorpayPaymentId(),
                paymentVerificationRequest.getRazorpaySignature())) {
            throw new RuntimeException("Payment Verification is failed");
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayOrderId(paymentVerificationRequest.getRazorpayOrderId());
        paymentDetails.setRazorpayPaymentId(paymentVerificationRequest.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(paymentVerificationRequest.getRazorpaySignature());
        paymentDetails.setPaymentStatus(PaymentStatus.COMPLETED);

        existingOrder = orderRepository.save(existingOrder);

        return convertToResponse(existingOrder);
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        return true;
    }
}
