import apiClient from "./apiClient";

interface PaymentRequest {
    amount: number;
    currency: string;
}

export interface PaymentVerificationRequest {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    orderId : string;
}

export interface RazorpayOrderResponse {
    id : string;
    entity : string;
    amount : number;
    currency : string;
    status : string;
    createdAt : string;
    receipt : string;
}

export const createRazorpayOrder = async (data : PaymentRequest) => {
    return await apiClient.post("/payments/create_order", data);
}

export const verifyPayment = async (paymentData: PaymentVerificationRequest) => {
    return await apiClient.post("/payments/verify", paymentData);
}