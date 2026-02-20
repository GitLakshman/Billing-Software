import { useContext, useState } from "react";
import { AppContext } from "../../context";
import CategoryDisplay from "../../components/Explore/CategoryDisplay";
import ItemsDisplay from "../../components/Explore/ItemsDisplay";
import CustomerForm from "../../components/Explore/CustomerForm";
import CartItems from "../../components/Explore/CartItems";
import CartSummary from "../../components/Explore/CartSummary";
import "./index.css";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  return (
    <div className="explore-wrapper">
      {/* LeftSide Column */}
      <div className="explore-left">
        {/* Categories Row */}
        <div className="explore-categories">
          <CategoryDisplay
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr className="explore-divider" />
        {/* Items Row */}
        <div className="explore-items">
          <ItemsDisplay selectedCategory={selectedCategory} />
        </div>
      </div>
      {/* RightSide Column */}
      <div className="explore-right">
        {/* Customer Form Container */}
        <div className="explore-customer-form">
          <CustomerForm
            customerName={customerName}
            customerPhone={customerPhone}
            setCustomerName={setCustomerName}
            setCustomerPhone={setCustomerPhone}
          />
        </div>
        <hr className="explore-cart-divider" />
        {/* Cart Items Container */}
        <div className="explore-cart-items">
          <CartItems />
        </div>
        {/* Cart Summary Container */}
        <div className="explore-cart-summary">
          <CartSummary
            customerName={customerName}
            customerPhone={customerPhone}
            setCustomerName={setCustomerName}
            setCustomerPhone={setCustomerPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
