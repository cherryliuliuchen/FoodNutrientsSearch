// src/hooks/useSearchResults.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../helper/apiClient';

const useSearchResults = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      setLoading(true);
      apiClient.get(`/food/search?query=${encodeURIComponent(query)}`)
        .then(response => {
          setFoods(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [query]);

  return { foods, loading };
};

export default useSearchResults;
