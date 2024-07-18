// WaitingPaid.tsx: page này để view những khóa học đang chờ thanh toán, item có status waiting_paid sẽ ở trong page này.
import { React, useEffect, useState, getCart, updateCart, Button, DeleteOutlined } from '../../utils/commonImports';
import { toast } from 'react-toastify';

interface CartItem {
    _id: string;
    course_name: string;
    instructor_name: string;
    price: number;
    discount: number;
    cart_no: string;
    status: string;
}

const WaitingPaid: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
                toast.error('Error fetching cart items');
            }
        };

        fetchCartItems();
    }, []);

    const handleSelectChange = (selectedKeys: React.Key[]) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handlePayNow = async () => {
        const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item._id));
        if (selectedItems.length === 0) {
            toast.error('Please select items to pay');
            return;
        }

        try {
            await updateCart({
                status: 'completed',
                items: selectedItems.map(item => ({
                    _id: item._id,
                    cart_no: item.cart_no
                }))
            });
            setCartItems(cartItems.filter(item => !selectedRowKeys.includes(item._id)));
            setSelectedRowKeys([]);
            toast.success('Payment successful');
        } catch (error) {
            console.error('Error during payment:', error);
            toast.error('Error during payment');
        }
    };

    const handleDelete = async (itemId: string, cartNo: string) => {
        try {
            await updateCart({
                status: 'cancel',
                items: [{ _id: itemId, cart_no: cartNo }]
            });
            setCartItems(cartItems.filter(item => item._id !== itemId));
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Error deleting item');
        }
    };
    const selectedItems = cartItems.filter(item => selectedRowKeys.includes(item._id));
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
    const totalDiscount = selectedItems.reduce((acc, item) => acc + item.discount, 0);
    const totalBill = totalPrice - totalDiscount;

    if (cartItems.length === 0) {
        return <div className="flex justify-center items-center h-screen">No items waiting for payment</div>;
    }

    return (
        <div className="p-4 flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
                <p className='text-gray-700 mb-6'>Let's complete your payment!</p>
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
                                        <DeleteOutlined
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDelete(item._id, item.cart_no)}
                                        />
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
                <h2 className="flex justify-center text-2xl font-bold">ORDER SUMMARY</h2>
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
                    onClick={handlePayNow}
                >
                    Buy Now
                </Button>
            </div>
        </div>
    );
};

export default WaitingPaid;
