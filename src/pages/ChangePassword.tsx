import { React, Form, Input, Button, notification, changePassword } from '../utils/commonImports';

interface ChangePasswordFormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();

    const userData = localStorage.getItem('userData');
    const userId = userData ? JSON.parse(userData)._id : null;

    const handleChangePassword = async (values: ChangePasswordFormValues) => {
        const { currentPassword, newPassword } = values;

        if (!userId) {
            notification.error({
                message: 'Error',
                description: 'User ID not found',
            });
            return;
        }

        try {
            await changePassword({ user_id: userId, old_password: currentPassword, new_password: newPassword });
            form.resetFields();
        } catch (error) {
            console.error('Error changing password:', error);
            notification.error({
                message: 'Error',
                description: 'Error changing password',
            });
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Change Password</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleChangePassword}
                initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
            >
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[{ required: true, message: 'Current Password is required' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        { required: true, message: 'New Password is required' },
                        { min: 6, message: 'New Password must be at least 6 characters' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Confirm New Password is required' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded"
                    >
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
