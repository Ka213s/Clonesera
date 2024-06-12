import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import SearchBar from './SearchBar';
import FilterSection from './FilterSection';
import UserList from './UserList';

const User: React.FC = () => {
  return (
    <MainLayout>
      <SearchBar />
      <FilterSection />
      <UserList />
    </MainLayout>
  );
};

export default User;
