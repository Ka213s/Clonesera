import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import DisplayAccount from './DisplayAccount';
import AccountIsDelete from './AccountIsDelete';
import AccountIsVerify from './AccountIsVerify';
import CreateAccount from '../CreateAccount/CreateAccount'; // Ensure the path is correct

const { TabPane } = Tabs;

const ActiveTab: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button
        type="primary"
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}
        onClick={showModal}
      >
        Add User
      </Button>
      <Tabs defaultActiveKey="1">
        <TabPane tab="DisplayAccount" key="1">
          <DisplayAccount status={true} isDeleted={false} />
        </TabPane>
        <TabPane tab="DisplayAccount chưa verify" key="2">
          <AccountIsVerify status={true} isDeleted={false} />
        </TabPane>
        <TabPane tab="Account Delete" key="3">
          <AccountIsDelete status={true} isDeleted={true} />
        </TabPane>
      </Tabs>
      <Modal 
        title="Create New Account" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        footer={null}
        width={800} // Adjust the width as needed
      >
        <CreateAccount />
      </Modal>
    </div>
  );
};

export default ActiveTab;
