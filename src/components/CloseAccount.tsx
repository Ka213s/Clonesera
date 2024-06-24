import React from 'react';
import { Typography, Input, Button } from 'antd';

const { Title, Text } = Typography;

const CloseAccount: React.FC<any> = ({
  password,
  setPassword,
  // handleCloseAccount
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Close Account</h2>
      <p className="text-gray-700">
        <span className="font-bold">Warning:</span> If you close your account, you will be unsubscribed from all your 5 courses, and will lose access forever.
      </p>
      <div className="mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Enter Password to Confirm
        </label>
        <Input.Password
          id="password"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Are you sure you want to close your account?</p>
      </div>
      <Button
        // onClick={handleCloseAccount}  
        type="primary"
        className="bg-[#9997F5] hover:bg-[#8886E5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Close Account
      </Button>
    </div>
  );
};

export default CloseAccount;
