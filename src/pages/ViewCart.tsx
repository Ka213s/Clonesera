import React, { useEffect, useState } from 'react';
import { getCart } from '../services/Api'; 
import { Table, Button, message } from 'antd'; 
import { DeleteOutlined } from '@ant-design/icons';

interface CartItem {
    _id: string;
    cart_no: string;
    course_name: string;
    price: number;
}

const ViewCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    const handleRemove = async (id: string) => {
        // Implement the remove logic here, possibly using another API call
        console.log(`Removing cart item with id: ${id}`);
        // After removing the item from the server, update the cartItems state
        setCartItems(cartItems.filter(item => item._id !== id));
        message.success('Cart item removed');
    };

    const columns = [
        {
            title: 'Cart No',
            dataIndex: 'cart_no',
            key: 'cart_no',
        },
        {
            title: 'Course Name',
            dataIndex: 'course_name',
            key: 'course_name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <span>${price}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: CartItem) => (
                <Button onClick={() => handleRemove(record._id)} type="link" icon={<DeleteOutlined />} />
            ),
        },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (cartItems.length === 0) {
        return <div>No items in the cart</div>;
    }

    return (
        <div>
            <h1>View Cart</h1>
            <Table dataSource={cartItems} columns={columns} rowKey="_id" pagination={false} />
        </div>
    );
};

export default ViewCart;
