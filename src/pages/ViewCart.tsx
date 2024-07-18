import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCart, message, Button, Checkbox, Input } from '../utils/commonImports';
import DeleteCart from '../components/Cart/DeleteCart';

interface CartItem {
    _id: string;
    course_name: string;
    instructor_name: string;
    price: number;
    discount: number;
    cart_no: string;
    status: string;
    image_url: string;
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
                const filteredItems = response.pageData.filter((item: CartItem) =>
                    item.status === 'new' || item.status === 'cancel'
                );
                setCartItems(filteredItems);
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
        <div className="p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                <div className="flex items-center mb-4">
                    <Checkbox
                        onChange={e => {
                            const checked = e.target.checked;
                            setSelectedRowKeys(checked ? cartItems.map(item => item._id) : []);
                        }}
                        checked={selectedRowKeys.length === cartItems.length}
                    >
                        Select all
                    </Checkbox>
                    <span className="ml-auto text-blue-500">{cartItems.length} Courses in Cart</span>
                </div>
                <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow-md flex items-start gap-4">
                            <Checkbox
                                checked={selectedRowKeys.includes(item._id)}
                                onChange={() => {
                                    const newSelectedRowKeys = selectedRowKeys.includes(item._id)
                                        ? selectedRowKeys.filter(key => key !== item._id)
                                        : [...selectedRowKeys, item._id];
                                    handleSelectChange(newSelectedRowKeys);
                                }}
                            />
                            <img src={item.image_url} alt={item.course_name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">{item.course_name}</h2>
                                    <DeleteCart cartId={item._id} onRemove={handleRemove} />
                                </div>
                                <p className="text-gray-600 mb-1">By {item.instructor_name}</p>
                                <div className="flex items-center justify-between">
                                    {item.discount > 0 ? (
                                        <>
                                            <span className="text-gray-500 line-through">${item.price.toFixed(2)}</span>
                                            <span className="text-lg font-bold text-red-500">${(item.price - item.discount).toFixed(2)}</span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-black">${item.price.toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/3 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Total Discount</span>
                    <span className="text-lg font-bold">-${totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-xl font-semibold">${totalBill.toFixed(2)}</span>
                </div>
                <Button type="primary" className="w-full py-3 text-lg font-semibold" onClick={handleCheckout}>
                    Checkout Now
                </Button>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Promotions</h3>
                    <Input
                        placeholder="Coupon code"
                        className="mt-2"
                        suffix={<Button type="link">Apply</Button>}
                    />
                    <p className="text-gray-500 mt-2">
                        Buy now, pay later for order of $52.50 and over with leterpay.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewCart;
