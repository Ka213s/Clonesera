import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ApiService from '../../api/ApiService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ChangePassword from '../../components/ChangePassword';

interface UserData {
    id: string;
    username: string;
    password: string;
    email: string;
    fullName: string | null;
    phoneNumber: string | null;
    avatar: string | null;
    roleId: number;
    address: string | null;
    status: boolean;
    createdAt: string | null;
    updateAt: string | null;
    walletId: string | null;
}

const InstructorHome: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('userData');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                try {
                    const response = await ApiService.getAccountById(user.id);
                    setUserData(response);
                } catch (error) {
                    toast.error('Error fetching user data');
                    console.error('Error fetching user data:', error);
                }
            } else {
                navigate('/');
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserData((prevState: UserData | null) => {
            if (prevState) {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
            return prevState;
        });
    };

    const handleEdit = (): void => {
        setIsEditing(true);
    };

    const handleCancel = (): void => {
        setIsEditing(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (userData) {
            try {
                const updatedData = await ApiService.updateAccount(userData.id, userData);
                setUserData(updatedData);
                setIsEditing(false);
                toast.success('Account updated successfully');
            } catch (error) {
                toast.error('Error updating account');
                console.error('Error updating account:', error);
            }
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && userData) {
            try {
                const folderName = userData.id;
                const avatarUrl = await uploadFile(file, folderName);
                const updatedUserData = { ...userData, avatar: avatarUrl };
                setUserData(updatedUserData);
                await ApiService.updateAccount(userData.id, updatedUserData);
                toast.success('Avatar uploaded successfully');
            } catch (error) {
                console.error('Error uploading avatar:', error);
                toast.error('Failed to upload avatar. Please try again.');
            }
        }
    };

    const uploadFile = (file: File, folder: string) => {
        return new Promise<string>((resolve, reject) => {
            const storageRef = ref(storage, `${folder}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    if (userData.roleId !== 3) {
        return <div>Access denied!</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                <h2 className="text-2xl font-semibold mb-6">Instructor Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={userData.fullName || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={userData.phoneNumber || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={userData.address || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="avatarFile" className="block text-sm font-medium text-gray-700">Upload Avatar:</label>
                        <input
                            type="file"
                            id="avatarFile"
                            name="avatarFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">Role ID:</label>
                        <input
                            type="text"
                            id="roleId"
                            name="roleId"
                            value="Instructor"
                            disabled
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
                        />
                    </div>
                    <div>
                        <img src={userData.avatar || 'default-avatar.png'} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mt-4" />
                    </div>
                    {isEditing ? (
                        <div className="flex space-x-4 mt-4">
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
                            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Cancel</button>
                        </div>
                    ) : (
                        <button type="button" onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4">Edit</button>
                    )}
                </form>
                <ChangePassword userId={userData.id} />
                <ToastContainer />
            </div>
        </div>
    );
};

export default InstructorHome;
