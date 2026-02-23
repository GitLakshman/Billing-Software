import type { FilterType } from "../../pages/OrderHistory/types";

interface FilterBarProps {
  activeFilter: FilterType;
  customFrom: string;
  customTo: string;
  showDatePicker: boolean;
  onFilterClick: (filter: FilterType) => void;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onClearDates: () => void;
}

const FilterBar = ({
  activeFilter,
  customFrom,
  customTo,
  showDatePicker,
  onFilterClick,
  onCustomFromChange,
  onCustomToChange,
  onClearDates,
}: FilterBarProps) => {
  return (
    <div className="order-filter-bar">
      <div className="order-filter-tabs">
        {(["today", "week", "month", "custom"] as FilterType[]).map(
          (filter) => (
            <button
              key={filter}
              id={`filter-${filter}`}
              className={`order-filter-tab ${activeFilter === filter ? "active" : ""}`}
              onClick={() => onFilterClick(filter)}
            >
              {filter === "today" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              )}
              {filter === "week" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              )}
              {filter === "month" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <rect x="7" y="14" width="3" height="3" rx="0.5" />
                </svg>
              )}
              {filter === "custom" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <rect x="7" y="14" width="3" height="3" rx="0.5" />
                </svg>
              )}
              <span>
                {filter === "today"
                  ? "Today"
                  : filter === "week"
                    ? "This Week"
                    : filter === "month"
                      ? "This Month"
                      : "Custom Range"}
              </span>
            </button>
          ),
        )}
      </div>

      {/* Custom Date Range Picker */}
      {showDatePicker && activeFilter === "custom" && (
        <div className="order-date-range-picker">
          <div className="order-date-input-group">
            <label htmlFor="date-from">From</label>
            <input
              type="date"
              id="date-from"
              value={customFrom}
              onChange={(e) => onCustomFromChange(e.target.value)}
              className="order-date-input"
            />
          </div>
          <div className="order-date-separator">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <rect x="7" y="14" width="3" height="3" rx="0.5" />
            </svg>
          </div>
          <div className="order-date-input-group">
            <label htmlFor="date-to">To</label>
            <input
              type="date"
              id="date-to"
              value={customTo}
              onChange={(e) => onCustomToChange(e.target.value)}
              className="order-date-input"
            />
          </div>
          {(customFrom || customTo) && (
            <button
              className="order-date-clear-btn"
              onClick={onClearDates}
              title="Clear dates"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
