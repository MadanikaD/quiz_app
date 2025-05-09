import React from 'react';

const CategorySelector = ({ selected, onSelect }) => {
  const categories = ['general', 'science', 'sports'];

  return (
    <div className="mb-4">
      <label className="mr-2 font-semibold">Category:</label>
      <select value={selected} onChange={e => onSelect(e.target.value)} className="border p-1 rounded">
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
