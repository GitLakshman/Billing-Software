package com.lakshman.Billing_Software.service;

import com.lakshman.Billing_Software.dto.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {
    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
