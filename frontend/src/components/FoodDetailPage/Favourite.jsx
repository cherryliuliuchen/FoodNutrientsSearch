import React from 'react';
import useFavourites from '../../hooks/useFavourites';

const Favourite = ({ fdcId, description = "unknown" }) => {
  const { favourites, addFavourite, removeFavourite, isFavourite } = useFavourites(); 

  const isFav = isFavourite(fdcId); // Make sure we have favourite

  const toggleFavourite = async () => {
    console.log("Toggling favourite for:", { fdcId, description }); 
    if (isFav) {
      await removeFavourite(fdcId);
    } else {
      await addFavourite(fdcId, description || "unknown");
    }
  };

  return (
    <button onClick={toggleFavourite} className={`btn ${isFav ? 'btn-danger' : 'btn-outline-secondary'}`}>
      {isFav ? 'Remove from favourite' : 'Add to favourite'}
    </button>
  );
};

export default Favourite;
