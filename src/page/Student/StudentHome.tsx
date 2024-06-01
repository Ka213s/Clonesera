import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ApiService from '../../services/ApiService';
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

const StudentHome: React.FC = () => {
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
                navigate('/'); // Redirect to login page if no user is found
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserData(prevState => {
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
                // Create folder name using user's ID
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

    if (userData.roleId !== 2) {
        return <div>Access denied!</div>;
    }

    return (
        <div>
            <h2>Student Home</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Full Name: </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={userData.fullName || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number: </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address: </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="avatar">Avatar URL: </label>
                    <input
                        type="text"
                        id="avatar"
                        name="avatar"
                        value={userData.avatar || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="avatarFile">Upload Avatar: </label>
                    <input
                        type="file"
                        id="avatarFile"
                        name="avatarFile"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label htmlFor="roleId">Role ID: </label>
                    <input
                        type="text"
                        id="roleId"
                        name="roleId"
                        value="Student" // Display role name instead of ID
                        disabled
                    />
                </div>
                <div>
                    <img src={userData.avatar || 'default-avatar.png'} alt="Avatar" width="100" />
                </div>
                {isEditing ? (
                    <div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <button type="button" onClick={handleEdit}>Edit</button>
                )}
            </form>
            <ChangePassword userId={userData.id} />
            <ToastContainer />
        </div>
    );
};

export default StudentHome;
