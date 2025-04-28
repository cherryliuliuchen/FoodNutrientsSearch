import { useState, useEffect } from 'react';
import apiClient from '../helper/apiClient';

const useFavourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavourites = async () => {
    try {
      console.log("Fetching favourites...");
      const response = await apiClient.get('/myfood');
      console.log("Favourites fetched:", response.data);
      setFavourites(response.data);
      setError(null);
    } catch (error) {
      console.error(" Error fetching favourites:", error);
      setError('Can not load favourite now');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const addFavourite = async (fdcId, description = "test") => {
    try {
      console.log("Attempting to add favourite...");
      console.log("Payload:", JSON.stringify({ fdcId, description }, null, 2));

      const response = await apiClient.post('/myfood', { fdcId, description });
      console.log("POST /myfood Response:", response.data);
      fetchFavourites(); 
    } catch (error) {
      console.error("Add to favourite failed", error);
    }
  };

  const removeFavourite = async (fdcId) => {
    try {
      console.log("Attempting to remove favourite...");
      console.log("Removing fdcId:", fdcId);

      await apiClient.delete(`/myfood/${fdcId}`);
      console.log("DELETE /myfood/" + fdcId + " success");
      fetchFavourites();
    } catch (error) {
      console.error("Remove from favorite failed", error);
      setError('Remove from favorite failed');
    }
  };

  const isFavourite = (fdcId) => {
    return favourites.some(item => item.fdcId === fdcId);
  };

  return { favourites, loading, error, addFavourite, removeFavourite, isFavourite };
};

export default useFavourites;
