import React from 'react';

const Select = ({ children, value, onChange, className = '' }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;