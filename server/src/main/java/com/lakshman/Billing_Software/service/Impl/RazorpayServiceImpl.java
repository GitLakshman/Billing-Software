package com.lakshman.Billing_Software.service.Impl;

import com.lakshman.Billing_Software.dto.RazorpayOrderResponse;
import com.lakshman.Billing_Software.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl  implements RazorpayService {

    @Value("${razorpay.id}")
    private String razorpayId;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayId, razorpaySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount*100);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "order_rcptid_"+System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);
        return convertToResponse(order);
    }

    private RazorpayOrderResponse convertToResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .receipt(order.get("receipt"))
                .createdAt(order.get("created_at"))
                .build();
    }
}
