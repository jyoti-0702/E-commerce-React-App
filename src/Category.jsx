import { useState } from 'react';

export default function Category({ categories, filterProducts }) {
  const [active, setActive] = useState('all');
  
  const handleClick = (cat) => {
    setActive(cat);
    filterProducts(cat);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      <button
        onClick={() => handleClick('all')}
        className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
          active === 'all'
          ? 'bg-gray-900 text-white shadow-lg scale-105'
            : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-gray-900 hover:shadow-md'
        }`}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-300 capitalize whitespace-nowrap ${
            active === cat
            ? 'bg-gray-900 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-gray-900 hover:shadow-md'
          }`}
        >
          {cat.replace(/-/g, ' ')}
        </button>
      ))}
    </div>
  );
}