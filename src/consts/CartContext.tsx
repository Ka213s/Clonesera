// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCart } from '../services/Api';

interface CartContextProps {
  cartCount: number;
  updateCartCount: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found. Skipping cart count fetch.');
      return;
    }

    const data = {
      searchCondition: {
        status: 'new',
        is_deleted: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 100,
      },
    };

    try {
      const response = await getCart(data);
      setCartCount(response.pageInfo.totalItems);
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount: fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
