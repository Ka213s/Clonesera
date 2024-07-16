import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCart } from '../services/Api';
import { message, Button } from 'antd';
import DeleteCart from '../components/Cart/DeleteCart';

interface CartItem {
    _id: string;
    course_name: string;
    instructor_name: string;
    price: number;
    discount: number;
    cart_no: string;  
}

const ViewCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const data = {
                searchCondition: {
                    status: '',
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

    const handleRemove = (id: string) => {
        setCartItems(cartItems.filter(item => item._id !== id));
        setSelectedRowKeys(selectedRowKeys.filter(key => key !== id));
    };

    const handleSelectChange = (selectedKeys: React.Key[]) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleCheckout = async () => {
        const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item._id));
        if (selectedItems.length === 0) {
            message.warning('Please select items to checkout');
            return;
        }

        const data = {
            status: 'waiting_paid',
            items: selectedItems.map(item => ({
                _id: item._id,
                cart_no: item.cart_no
            }))
        };

        try {
            await updateCart(data);
            message.success('Checkout successful');
            setCartItems(cartItems.filter(item => !selectedRowKeys.includes(item._id)));
            setSelectedRowKeys([]);
            navigate('/payment');
        } catch (error) {
            console.error('Error updating cart:', error);
            message.error('Error during checkout');
        }
    };

    const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item._id));
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
    const totalDiscount = selectedItems.reduce((acc, item) => acc + item.discount, 0);
    const totalBill = totalPrice - totalDiscount;

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (cartItems.length === 0) {
        return <div className="flex justify-center items-center h-screen">No items in the cart</div>;
    }

    return (
        <div className="p-4 flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
                <h1 className="text-2xl font-bold mb-6">My Cart</h1>
                <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded shadow-md">
                            <div className="flex items-start gap-4 mb-4">
                                <input
                                    type="checkbox"
                                    checked={selectedRowKeys.includes(item._id)}
                                    onChange={() => {
                                        const newSelectedRowKeys = selectedRowKeys.includes(item._id)
                                            ? selectedRowKeys.filter(key => key !== item._id)
                                            : [...selectedRowKeys, item._id];
                                        handleSelectChange(newSelectedRowKeys);
                                    }}
                                />
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold">{item.course_name}</h2>
                                        <DeleteCart cartId={item._id} onRemove={handleRemove} />
                                    </div>
                                    <p className="text-gray-600 mb-2">Instructor: {item.instructor_name}</p>
                                    <p className="text-red-500 text-lg font-bold mb-4">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/3 lg:ml-4 lg:mt-0 mt-8 p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold">Total</h2>
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
                <Button
                    type="primary"
                    className="mt-4 w-full py-3 text-lg font-semibold"
                    onClick={handleCheckout}  
                >
                    Checkout Now
                </Button>
            </div>
        </div>
    );
};

export default ViewCart;
