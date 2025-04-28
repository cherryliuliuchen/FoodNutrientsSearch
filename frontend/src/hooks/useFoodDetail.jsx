import { useState, useEffect } from 'react';
import apiClient from '../helper/apiClient';

const useFoodDetail = (fdcId) => {
  const [foodDetails, setFoodDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fdcId) {
      setLoading(true);
      apiClient.get(`/food/${fdcId}`)
        .then(response => {
          setFoodDetails(response.data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching food details:', error);
          setError('Can not add details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [fdcId]);

  return { foodDetails, loading, error };
};

export default useFoodDetail;
