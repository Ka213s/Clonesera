import React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <Spin tip="Loading..." />
        </div>
      )}
      <div className={isLoading ? 'opacity-50' : ''}>{children}</div>
    </div>
  );
};

export default Loading;
