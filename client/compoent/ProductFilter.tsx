'use client'
import React, { useState } from 'react';

interface ProductFilterProps {
  onSearch: (searchTerm: string) => void;
  onSort: (sortBy: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded p-2"
      />
      <select onChange={handleSortChange} className="border rounded p-2">
        <option value="">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductFilter;
