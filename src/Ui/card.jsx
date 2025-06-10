// src/components/ui/card.jsx (or src/ui/card.jsx)
import React from 'react';

// A basic Card component
const Card = ({ className, children, ...props }) => {
  return (
    <div
      // Default card styles applied directly
      // Using concrete Tailwind colors for simplicity instead of custom variables like 'bg-card'
      className={`rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

// A basic CardContent component
const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      // Default padding, customizable
      className={`p-8 ${className || ''}`} // Adjusted to p-8 to match your original Services section padding
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardContent };