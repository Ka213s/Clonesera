import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/Api';
import { Card, Col, Row, Spin } from 'antd';

const Finance: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const searchCondition = {
          keyword: '',
          role: 'admin',
          status: true,
          is_deleted: false,
          is_verified: 'true',
        };
        const pageNum = 1;
        const pageSize = 10;

        const response = await getUsers(searchCondition, pageNum, pageSize);
        if (response.success && response.data.pageData.length > 0) {
          setUser(response.data.pageData[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Your Bank Account">
            <p><strong>Bank Account:</strong> {user.bank_account}</p>
            <p><strong>Bank Name:</strong> {user.bank_name}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Balance Total">
            <p><strong>Balance Total:</strong> {user.balance_total.toLocaleString()} VND</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Finance;
