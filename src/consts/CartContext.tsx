import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart } from '../services/Api'; // Import your API call

interface CartContextType {
  totalCartItems: number;
  setTotalCartItems: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found in local storage');
        return;
      }

      try {
        const cartData = await getCart({
          searchCondition: { status: 'new', is_deleted: false },
          pageInfo: { pageNum: 1, pageSize: 10 }
        });
        console.log('Cart data:', cartData);
        setTotalCartItems(cartData.pageInfo.totalItems);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ totalCartItems, setTotalCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
