package com.lakshman.Billing_Software.controller;

import com.lakshman.Billing_Software.dto.OrderResponse;
import com.lakshman.Billing_Software.dto.PaymentRequest;
import com.lakshman.Billing_Software.dto.PaymentVerificationRequest;
import com.lakshman.Billing_Software.dto.RazorpayOrderResponse;
import com.lakshman.Billing_Software.service.OrderService;
import com.lakshman.Billing_Software.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create_order")
    public ResponseEntity<RazorpayOrderResponse> createRazorpayOrder(@RequestBody PaymentRequest paymentRequest) throws RazorpayException {
        return ResponseEntity.status(HttpStatus.CREATED).body(razorpayService.createOrder(paymentRequest.getAmount(), paymentRequest.getCurrency()));
    }

    @PostMapping("/verify")
    public OrderResponse verifyOrder(@RequestBody PaymentVerificationRequest paymentVerificationRequest) throws RazorpayException {
        return orderService.verifyPayment(paymentVerificationRequest);
    }
}
