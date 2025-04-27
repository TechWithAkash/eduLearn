import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
    extraLarge: 'h-16 w-16 border-4'
  };
  
  const spinner = (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-blue-500 border-t-transparent animate-spin`}
      />
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner;