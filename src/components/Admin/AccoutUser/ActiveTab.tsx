import React from 'react';
import { Tabs } from 'antd';
import DisplayAccount from './DisplayAccount';
import AccountIsDelete from './AccountIsDelete';
import AccountIsVerify from './AccountIsVerify';
const { TabPane } = Tabs;

const ActiveTab: React.FC = () => {
  return (
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
  );
};

export default ActiveTab;
