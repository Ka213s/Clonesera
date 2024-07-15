import { React, useState, useEffect, Form, Input, Button, getUserData, updateAccount, getCurrentLogin } from '../utils/commonImports';
import ResizableTextArea from "antd/lib/input";
import FileUploader from '../components/FileUploader';

interface UserData {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    description: string;
    phone_number: string;
    avatar: string;
    video: string;
    dob: string;
}

const AccountSettings: React.FC = () => {
    const [saving, setSaving] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);

    const fetchUserData = async (id: string) => {
        try {
            const userDetail = await getUserData(id);
            setUserData(userDetail);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                const user = await getCurrentLogin();
                if (user && user._id) {
                    fetchUserData(user._id);
                }
            } catch (error) {
                console.error('Error fetching current login:', error);
            }
        };

        initialize();
    }, []);

    const handleSaveChanges = async (values: Partial<UserData>) => {
        setSaving(true);

        const updatedProfile: UserData = {
            ...userData!,
            ...values,
            avatar: imageURL || userData!.avatar,
            dob: values.dob || userData!.dob
        };

        try {
            await updateAccount(userData!._id, updatedProfile);
            setUserData(updatedProfile);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

    if (!userData) {
        return null;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-2 mt-10">Basic Profile</h2>
            <p>Add information about yourself</p>
            <div className="mt-6">
                <Form
                    layout="vertical"
                    onFinish={handleSaveChanges}
                    initialValues={{
                        ...userData,
                        dob: userData.dob ? userData.dob.split('T')[0] : null,
                    }}
                >
                    <Form.Item
                        label="Upload Image"
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <FileUploader type="image" onUploadSuccess={setImageURL} />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Full Name is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[
                            { required: true, message: 'Phone Number is required' },
                            { pattern: /^\d{10}$/, message: 'Phone Number must be 10 digits' }
                        ]}
                    >
                        <Input maxLength={10} />
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: true, message: 'Date of Birth is required' }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Description is required' }]}
                    >
                        <ResizableTextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={saving}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AccountSettings;