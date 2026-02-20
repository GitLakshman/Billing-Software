import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import { toast } from "react-toastify";
import {
  createOrder,
  deleteOrder,
  type OrderRequest,
  type OrderResponse,
} from "../../../service/OrderService";
import {
  createRazorpayOrder,
  verifyPayment,
  type PaymentVerificationRequest,
} from "../../../service/PaymentService";
import { AppConstants } from "../../../constsants";
import Recepit from "../../Recepit";

type PaymentMode = "cash" | "upi";

// Declare Razorpay on window for direct usage (avoids react-razorpay hook issues)
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

interface CartSummaryProps {
  customerName: string;
  customerPhone: string;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
}

const CartSummary = ({
  customerName,
  customerPhone,
  setCustomerName,
  setCustomerPhone,
}: CartSummaryProps) => {
  const { cartItems, clearCart } = useContext(AppContext);

  const [isprocessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderResponse | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const clearAll = () => {
    setCustomerName("");
    setCustomerPhone("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopUp(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.itemPrice ?? "0") * Number(item.itemsCount ?? "0"),
    0,
  );

  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // If Razorpay is already loaded, resolve immediately
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode: PaymentMode) => {
    if (!customerName || !customerPhone) {
      toast.error("Please enter valid customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData: OrderRequest = {
      customerName,
      customerPhone,
      cartItems: cartItems.map((item) => ({
        itemId: item.itemId ?? "",
        itemName: item.itemName ?? "",
        itemPrice: parseFloat(item.itemPrice ?? "0"),
        itemsCount: item.itemsCount ?? 0,
      })),
      totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };
    setIsProcessing(true);
    let currentOrder: OrderResponse | null = null;
    try {
      const response = await createOrder(orderData);
      const savedData = response.data as OrderResponse;
      currentOrder = savedData;

      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "upi") {
        // Load Razorpay checkout script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error("Razorpay failed to load");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        // Create Razorpay order via backend
        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options: Record<string, unknown> = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency || "INR",
          order_id: razorpayResponse.data.id,
          name: "MyRetailShop",
          description: "Payment for order " + savedData.orderId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async function (response: any) {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: customerPhone,
          },
          method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async () => {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled");
            },
          },
        };

        // Use window.Razorpay directly instead of the hook to avoid issues
        const rzp = new window.Razorpay(options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rzp.on("payment.failed", async (response: any) => {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed");
          console.error(response.error?.description);
        });
        rzp.open();
      }
    } catch (error) {
      console.log(error);
      if (currentOrder && paymentMode === "upi") {
        await deleteOrderOnFailure(currentOrder.orderId);
      }
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  interface RazorpaySuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  const verifyPaymentHandler = async (
    response: RazorpaySuccessResponse,
    savedOrder: OrderResponse,
  ) => {
    const paymentData: PaymentVerificationRequest = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment successful");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            ...savedOrder.paymentDetails,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            paymentStatus: "COMPLETED",
          },
        });
      } else {
        toast.error("Payment Processing Failed");
      }
    } catch (error) {
      console.log(error);

      toast.error("Payment failed");
    }
  };

  return (
    <div className="mt-2">
      <div className="cart-summary-container">
        <div className="flex justify-between mb-2">
          <span className="font-light">Items Price:</span>
          <span className="font-light">&#8377;{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-light">Tax(1%):</span>
          <span className="font-light">&#8377;{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-light">Total:</span>
          <span className="font-light">&#8377;{grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          className="flex-1 py-1 bg-green-500 rounded cursor-pointer"
          onClick={() => completePayment("cash")}
          disabled={isprocessing}
        >
          {isprocessing ? "Processing..." : "Cash"}
        </button>
        <button
          className="flex-1 py-1 bg-blue-500 rounded cursor-pointer"
          onClick={() => completePayment("upi")}
          disabled={isprocessing}
        >
          {isprocessing ? "Processing..." : "UPI"}
        </button>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          className="flex-1 py-1 bg-yellow-500 rounded cursor-pointer"
          onClick={placeOrder}
          disabled={isprocessing || !orderDetails}
        >
          Place Order
        </button>
        {showPopUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Recepit
              orderDetails={orderDetails!}
              onClose={() => {
                clearAll();
                setShowPopUp(false);
              }}
              onPrint={handlePrintReceipt}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
