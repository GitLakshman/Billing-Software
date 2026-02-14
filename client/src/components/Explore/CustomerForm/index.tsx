interface CustomerFormProps {
  customerName: string;
  customerPhone: string;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
}

const CustomerForm = ({
  customerName,
  customerPhone,
  setCustomerName,
  setCustomerPhone,
}: CustomerFormProps) => {
  return (
    <div className="p-3 text-sm">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <label htmlFor="customerName" className="w-1/3">
            Customer Name
          </label>
          <input
            type="text"
            name="customerName"
            id="customerName"
            className="px-2 py-1 border-none focus:ring-1 focus:ring-blue-400 focus:outline-none bg-amber-50 text-gray-700 rounded-sm"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <label htmlFor="customerPhone" className="w-1/3">
            Customer Phone
          </label>
          <input
            type="text"
            name="customerPhone"
            id="customerPhone"
            className="px-2 py-1 border-none focus:ring-1 focus:ring-blue-400 focus:outline-none bg-amber-50 text-gray-700 rounded-sm"
            onChange={(e) => setCustomerPhone(e.target.value)}
            value={customerPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
