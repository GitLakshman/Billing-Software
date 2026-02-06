import { useContext } from "react";
import { AppContext } from "../../context";

const Explore = () => {
  const { categories } = useContext(AppContext);
  console.log(categories);
  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      {/* LeftSide Column */}
      <div className="left-form-box">
        {/* Categories Row */}
        <div className="flex-4/12 flex-col" style={{ overflowY: "auto" }}>
          Categories Row
        </div>
        <hr className="my-5 mx-0 border-gray-600" />
        {/* Items Row */}
        <div
          className="flex-8/12 flex-col box-border"
          style={{ overflowY: "auto" }}
        >
          Items Row
        </div>
      </div>
      {/* RightSide Column */}
      <div className="right-list-box">
        {/* Customer Form Container */}
        <div style={{ height: "15%" }}>Customer Form Container</div>
        <hr className="my-3 border-t border-gray-600" />
        {/* Cart Items Container */}
        <div
          className="rounded-lg "
          style={{ height: "55%", overflowY: "auto" }}
        >
          Cart Items Container
        </div>
        {/* Cart Summary Container */}
        <div
          className="flex-[0.3] border-t border-gray-400"
          style={{ height: "30%" }}
        >
          Cart Summary Container
        </div>
      </div>
    </div>
  );
};

export default Explore;
