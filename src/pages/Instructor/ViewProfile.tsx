import { useState, useEffect } from 'react';
import { TwitterOutlined, LinkedinOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getCurrentLogin } from '../../services/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
  _id: string;
  name: string;
  email: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar: string;
  video: string;
  dob: Date;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

const ViewProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentLogin();
        setUserData(data);
      } catch (error) {
        toast.error('Error fetching user data');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    switch (activeTab) {
      case 'About':
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">About Me</h3>
            {userData?.video && (
              <div className="mb-4">
                <video className="w-full max-h-96" controls>
                  <source src={userData.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p className="text-gray-700">{userData?.description}</p>
          </div>
        );
      case 'Course':
        return (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {/* Render courses here */}
          </div>
        );
      case 'Subscription':
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Subscriptions</h3>
            {/* Render subscriptions here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={userData?.avatar || 'path/to/default/avatar.jpg'}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-lg"
            />
            <div className="ml-8">
              <h1 className="text-3xl font-bold">{userData?.name || 'Your Name'}</h1>
              <p className="text-gray-600">@{userData?.email || 'username'}</p>
              <p className="text-gray-600 mt-2">{userData?.phone_number || 'Location'}</p>
              <div className="flex space-x-4 mt-4">
                <TwitterOutlined className="text-2xl text-blue-500" />
                <LinkedinOutlined className="text-2xl text-blue-700" />
                <YoutubeOutlined className="text-2xl text-red-600" />
                <FacebookOutlined className="text-2xl text-blue-800" />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button className="custom-button" onClick={() => navigate('/setting-page')}>Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="flex space-x-6 border-b border-gray-200 pb-3">
          {['About', 'Course','Subscription'].map((tab) => (
            <button
              key={tab}
              className={`text-gray-600 pb-2 ${activeTab === tab ? 'border-b-2 border-[#9997F5] font-semibold text-[#9997F5]' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewProfile;
