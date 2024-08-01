import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import DisplayAccount from './DisplayAccount';
import AccountIsVerify from './AccountIsVerify';
import CreateAccount from '../CreateAccount/CreateAccount';

const { TabPane } = Tabs;

const ActiveTab: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log('Button Clicked!'); // Log message to verify button click
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={
          <Button
            type="primary"
            onClick={showModal}
            className='custom-button'
          >
            Add User
          </Button>
        }
      >
        <TabPane tab="All accounts" key="1">
          <DisplayAccount status={true} isDeleted={false} />
        </TabPane>
        <TabPane tab="Unverified accounts" key="2">
          <AccountIsVerify status={true} isDeleted={false} />
        </TabPane>
      </Tabs>
      <Modal
        title="Create New Account"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800} // Adjust the width as needed
      >
        <CreateAccount onClose={handleCancel} />
      </Modal>
    </div>
  );
};

export default ActiveTab;
