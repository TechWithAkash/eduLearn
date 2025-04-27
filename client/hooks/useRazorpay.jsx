import { useState, useEffect } from 'react';

const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // If not loaded, create and load the script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createPayment = (options) => {
    if (!isLoaded) {
      return Promise.reject(new Error('Razorpay SDK is not loaded yet'));
    }
    
    return new Promise((resolve) => {
      const razorpayInstance = new window.Razorpay({
        ...options,
        handler: (response) => {
          resolve(response);
          if (options.handler) {
            options.handler(response);
          }
        },
      });
      
      razorpayInstance.open();
    });
  };

  return { isLoaded, createPayment };
};

export default useRazorpay;