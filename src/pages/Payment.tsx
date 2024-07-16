import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCart } from '../services/Api';
import { message, Button } from 'antd';
import { toast } from 'react-toastify';

interface CartItem {
    _id: string;
    course_name: string;
    instructor_name: string;
    price: number;
    discount: number;
}

const Payment: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const data = {
                searchCondition: {
                    status: 'waiting_paid',
                    is_deleted: false,
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 100,
                },
            };

            try {
                const response = await getCart(data);
                setCartItems(response.pageData);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                message.error('Error fetching cart items');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const selectedItems = cartItems;
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
    const totalDiscount = selectedItems.reduce((acc, item) => acc + item.discount, 0);
    const totalBill = totalPrice - totalDiscount;

    const handleUpdateCart = async (status: string) => {
        const items = selectedItems.map(item => ({ _id: item._id, cart_no: item._id }));
        const data = { status, items };

        try {
            await updateCart(data);
            if (status === 'completed') {
                toast.success('Checkout completed successfully');
            } else if (status === 'cancel') {
                toast.success('Checkout canceled');
                navigate('/view-cart');
            }
        } catch (error) {
            console.error('Error updating cart status:', error);
            toast.error('Error updating cart status');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (cartItems.length === 0) {
        return <div className="flex justify-center items-center h-screen">No items in the cart</div>;
    }

    return (
        <div className="lg:w-1/3 lg:ml-4 lg:mt-0 mt-8 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            {selectedItems.length > 0 ? (
                <div className="mt-4 p-4 border-t border-gray-200">
                    {selectedItems.map(item => (
                        <div key={item._id} className="flex flex-row justify-between items-center border-gray-200 py-2">
                            <p className="text-gray-800">{item.course_name}</p>
                            <p className="text-red-500 font-semibold">${item.price}</p>
                        </div>
                    ))}
                    <div className="border-t border-gray-200 mt-4 pt-4">
                        <p className="text-gray-800 mb-1">Original Price: ${totalPrice}</p>
                        <p className="text-gray-800 mb-1">Total Discount: ${totalDiscount}</p>
                        <p className="text-gray-600 text-xl font-semibold mb-2">Total Price: ${totalBill}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 mb-2">No items selected</p>
            )}
            <div className="flex gap-4 mt-4">
                <Button
                    type="primary"
                    className="w-full py-3 text-lg font-semibold"
                    onClick={() => handleUpdateCart('completed')}
                >
                    Confirm Checkout
                </Button>
                <Button
                    type="default"
                    className="w-full py-3 text-lg font-semibold"
                    style={{ backgroundColor: 'orange', color: 'white' }}
                    onClick={() => handleUpdateCart('cancel')}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default Payment;
