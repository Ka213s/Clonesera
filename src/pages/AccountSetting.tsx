import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import FileUploader from '../components/FileUploader';
import { getUserData, updateAccount, getCurrentLogin } from '../utils/commonImports';
import TinyMCEEditorComponent from '../utils/TinyMCEEditor';

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
    const [editorContent, setEditorContent] = useState<string>('');
   
    useEffect(() => {
        const initialize = async () => {
                const data = await getCurrentLogin();
              
                if (data && data._id) {
                    fetchUserData(data._id);
                }
        };

        initialize();
    }, []);

    const fetchUserData = async (id: string) => {
            const data = await getUserData(id);
            setUserData(data);
            setImageURL(data.avatar || null);
            setEditorContent(data.description || ''); // Set the existing description content
    };

    const handleSaveChanges = async (values: Partial<UserData>) => {
        setSaving(true);

        const updatedProfile: UserData = {
            ...userData!,
            ...values,
            avatar: imageURL || userData!.avatar,
            dob: values.dob || userData!.dob,
            description: editorContent, // Include the TinyMCE content
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
                        <FileUploader
                            type="image"
                            onUploadSuccess={setImageURL}
                            defaultImage={userData.avatar} 
                        />
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
                    >
                        <TinyMCEEditorComponent
                            value={editorContent}
                            onEditorChange={setEditorContent}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='custom-button' loading={saving}>
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AccountSettings;
