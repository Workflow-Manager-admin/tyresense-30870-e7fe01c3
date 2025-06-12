import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * RecommendationFilter:
 * - Filter controls for brand, size, budget.
 * - Provide current filter values and update handler up.
 */
function RecommendationFilter({
  filters,
  onFiltersChange,
  brandOptions = [],
  sizeOptions = [],
  budgetOptions = [],
}) {
  const handleChange = (field, val) => {
    onFiltersChange({ ...filters, [field]: val });
  };

  return (
    <div
      className="ts-tyre-filters"
      style={{
        display: "flex",
        gap: 14,
        marginBottom: 13,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <select
        value={filters.brand || ""}
        onChange={(e) => handleChange("brand", e.target.value)}
        className="ts-input"
        style={{ minWidth: 83, borderRadius: 7, fontWeight: 600, background: "#232327", color: "#edeef0", border: "1.2px solid #2f2f33" }}
        aria-label="Brand"
      >
        <option value="">All Brands</option>
        {brandOptions.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select
        value={filters.size || ""}
        onChange={(e) => handleChange("size", e.target.value)}
        className="ts-input"
        style={{ minWidth: 88, borderRadius: 7, fontWeight: 600, background: "#232327", color: "#edeef0", border: "1.2px solid #2f2f33" }}
        aria-label="Size"
      >
        <option value="">All Sizes</option>
        {sizeOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={filters.budget || ""}
        onChange={(e) => handleChange("budget", e.target.value)}
        className="ts-input"
        style={{ minWidth: 73, borderRadius: 7, fontWeight: 600, background: "#232327", color: "#edeef0", border: "1.2px solid #2f2f33" }}
        aria-label="Budget"
      >
        <option value="">All Budgets</option>
        {budgetOptions.map((b) => (
          <option key={b} value={b}>
            {b.charAt(0).toUpperCase() + b.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RecommendationFilter;
