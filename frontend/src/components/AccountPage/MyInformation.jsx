import React from 'react';
import useUserDetails from '../../hooks/useUserDetails';
import Logout from './Logout';

const MyInformation = () => {
  const { userInfo, error } = useUserDetails();

  if (error) {
    return <p>{error}</p>;
  }

  if (!userInfo) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>My Information</h2>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <Logout />
    </div>
  );
};

export default MyInformation;