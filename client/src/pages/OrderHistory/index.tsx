import { useOrderHistory } from "./useOrderHistory";
import FilterBar from "../../components/orderHistory/FilterBar";
import OrderTable from "../../components/orderHistory/OrderTable";
import Pagination from "../../components/orderHistory/Pagination";
import "./index.css";
import Recepit from "../../components/Recepit";

const OrderHistory = () => {
  const {
    loading,
    activeFilter,
    customFrom,
    customTo,
    showDatePicker,
    selectedOrder,
    showRecepit,
    filteredOrders,
    paginatedGroups,
    allFilteredOrders,
    totalPages,
    startIndex,
    currentPage,
    ITEMS_PER_PAGE,
    setCustomFrom,
    setCustomTo,
    goToPage,
    handleFilterClick,
    clearCustomDates,
    handleOpenRecepit,
    handleCloseRecepit,
    handlePrintRecepit,
  } = useOrderHistory();

  if (loading) {
    return <div className="order-history-loading">Loading...</div>;
  }

  return (
    <div className="order-history-wrapper">
      {/* Header */}
      <div className="order-history-header">
        <h2 className="order-history-title">Order History</h2>
        <span className="order-history-count">
          {filteredOrders.length} order{filteredOrders.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filter bar */}
      <FilterBar
        activeFilter={activeFilter}
        customFrom={customFrom}
        customTo={customTo}
        showDatePicker={showDatePicker}
        onFilterClick={handleFilterClick}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
        onClearDates={clearCustomDates}
      />

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="order-history-empty-state">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <p>No orders found for this period</p>
        </div>
      ) : (
        <>
          <OrderTable
            groups={paginatedGroups}
            onOpenReceipt={handleOpenRecepit}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={allFilteredOrders.length}
            onGoToPage={goToPage}
          />
        </>
      )}

      {/* Receipt modal */}
      {showRecepit && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Recepit
            orderDetails={selectedOrder}
            onClose={handleCloseRecepit}
            onPrint={handlePrintRecepit}
          />
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
