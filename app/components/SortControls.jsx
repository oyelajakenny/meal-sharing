import React from "react";

const SortControls = ({ sortField, sortDirection, onSortChange }) => {
  const handleFieldChange = (e) => {
    onSortChange({ sortField: e.target.value, sortDirection });
  };

  const handleDirectionChange = (e) => {
    onSortChange({ sortField, sortDirection: e.target.value });
  };

  return (
    <div>
      <label>
        Sort by:
        <select value={sortField} onChange={handleFieldChange} className="select">
          
          <option value="price">Price</option>
          <option value="title">Title</option>
          <option value="max_reservations">Max Reservations</option>
          <option value="stars">Stars</option>
        </select>
      </label>
      <label>
        Order:
        <select value={sortDirection} onChange={handleDirectionChange} className="select">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </label>
    </div>
  );
};

export default SortControls;
