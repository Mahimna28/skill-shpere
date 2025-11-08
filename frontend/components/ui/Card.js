import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;