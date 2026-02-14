import { useContext, useState } from "react";
import { AppContext } from "../../context";
import CategoryDisplay from "../../components/Explore/CategoryDisplay";
import ItemsDisplay from "../../components/Explore/ItemsDisplay";
import CustomerForm from "../../components/Explore/CustomerForm";
import CartItems from "../../components/Explore/CartItems";
import CartSummary from "../../components/Explore/CartSummary";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  console.log(categories);
  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      {/* LeftSide Column */}
      <div className="left-form-box">
        {/* Categories Row */}
        <div className="flex-4/12 flex-col" style={{ overflowY: "auto" }}>
          <CategoryDisplay
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr className="my-5 mx-0 border-gray-600" />
        {/* Items Row */}
        <div
          className="flex-8/12 flex-col box-border"
          style={{ overflowY: "auto" }}
        >
          <ItemsDisplay selectedCategory={selectedCategory} />
        </div>
      </div>
      {/* RightSide Column */}
      <div className="right-list-box">
        {/* Customer Form Container */}
        <div style={{ height: "15%" }}>
          <CustomerForm
            customerName={customerName}
            customerPhone={customerPhone}
            setCustomerName={setCustomerName}
            setCustomerPhone={setCustomerPhone}
          />
        </div>
        <hr className="my-3 border-t border-gray-600" />
        {/* Cart Items Container */}
        <div
          className="rounded-lg "
          style={{ height: "55%", overflowY: "auto" }}
        >
          <CartItems />
        </div>
        {/* Cart Summary Container */}
        <div
          className="flex-[0.3] border-t border-gray-400"
          style={{ height: "30%" }}
        >
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Explore;
