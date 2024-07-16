import React, { useEffect, useState } from 'react';
import { getSubscribeds, getUserData } from '../../utils/commonImports';

interface Subscription {
  _id: string;
  name: string;
  instructor_id: string;

}

interface UserData {
  _id: string;
  name: string;
}

const SubscriptionTab: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscribedsResponse = await getSubscribeds({ keyword: '', is_delete: false }, 1, 10);
        setSubscriptions(subscribedsResponse.pageData);
        if (subscribedsResponse.pageData.length > 0) {
          const instructorId = subscribedsResponse.pageData[0].instructor_id;
          const userData = await getUserData(instructorId);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>SubscriptionTab</h2>
      {user && (
        <div>
          <h3>Instructor: {user.name}</h3>
        </div>
      )}
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription._id}>{subscription.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionTab;
