import React from 'react';
import CreateBlog from './CreateBlog';
import GetBlogs from './GetBlogs';


const ManagerBlog: React.FC = () => {
  return (
    <div>
      <h1>Manager Blosg</h1>
      <CreateBlog />
      <GetBlogs />
      
    </div>
  );
};

export default ManagerBlog;
