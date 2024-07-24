import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
import DisplayAccount from './DisplayAccount';
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
        style={{ position: 'absolute', top: 0, right: 0, }}
        onClick={showModal}
        className='custom-button'
      >
        Add User
      </Button>
      <Tabs defaultActiveKey="1">
        <TabPane tab="DisplayAccount" key="1">
          <DisplayAccount status={true} isDeleted={false} />
        </TabPane>
        <TabPane tab="DisplayAccount is not verified" key="2">
          <AccountIsVerify status={true} isDeleted={false} />
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
