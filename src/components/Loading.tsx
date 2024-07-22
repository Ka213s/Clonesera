import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Animation - 1721629855151.json';

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="relative overflow-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      )}
      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Loading;
