import { useState, useEffect } from 'react';
import apiClient from '../helper/apiClient';

const useUserDetails = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get('/user/me');
        console.log("✅ User Info:", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error(" Error fetching user info:", error.response?.data || error.message);
        setError('Failed to fetch user information.');
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, error };
};

export default useUserDetails;
