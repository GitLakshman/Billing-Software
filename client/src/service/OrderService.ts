import apiClient from "./apiClient";

export interface OrderRequest {
    customerName: string;
    customerPhone: string;
    cartItems: OrderItemRequest[];
    totalAmount: number;
    tax: number;
    grandTotal: number;
    paymentMethod: string;
}

interface OrderItemRequest {
    itemId: string;
    itemName: string;
    itemPrice: number;
    itemsCount: number;
}

export interface OrderResponse {
    orderId: string;
    customerName: string;
    customerPhone: string;
    items: OrderItemResponse[];
    totalAmount: number;
    tax: number;
    grandTotal: number;
    paymentMethod: string;
    orderCreatedAt: string;
    paymentDetails: PaymentDetails;
}

export interface OrderItemResponse{
    itemId : string;
    itemName: string;
    itemPrice: number;
    itemsCount: number;
}

interface PaymentDetails{
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    paymentStatus: PaymentStatus;
}

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";


export const latestOrders = async () => {
    return await apiClient.get("/orders/latest");
}

export const createOrder = async (order: OrderRequest) => {
    return await apiClient.post("/orders", order);
}

export const deleteOrder = async (orderId: string) => {
    return await apiClient.delete(`/orders/${orderId}`);
}