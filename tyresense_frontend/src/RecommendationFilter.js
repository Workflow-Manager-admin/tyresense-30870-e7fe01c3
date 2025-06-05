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
        style={{ minWidth: 83, borderRadius: 10, fontWeight: 700 }}
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
        style={{ minWidth: 88, borderRadius: 10, fontWeight: 700 }}
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
        style={{ minWidth: 73, borderRadius: 10, fontWeight: 700 }}
        aria-label="Budget"
      >
        <option value="">All Budgets</option>
        {budgetOptions.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RecommendationFilter;
