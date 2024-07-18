import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteCart } from '../../services/Api';
import { toast } from 'react-toastify';

interface DeleteCartProps {
    cartId: string;
    onRemove: (id: string) => void;
}

const DeleteCart: React.FC<DeleteCartProps> = ({ cartId, onRemove }) => {
    const handleDelete = async () => {
        try {
            await deleteCart(cartId);
            onRemove(cartId);
        } catch (error) {
            console.error('Error deleting cart item:', error);
            toast.error('Error deleting cart item');
        }
    };

    return (
        <Button className='text-red-500 cursor-pointer' onClick={handleDelete} type="link" icon={<DeleteOutlined />} />
    );
};

export default DeleteCart;
