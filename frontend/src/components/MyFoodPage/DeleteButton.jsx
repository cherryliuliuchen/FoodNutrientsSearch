import React, { useState } from 'react';
import useFavourites from '../../hooks/useFavourites';
import ConfirmDeleteModal from '../common/ConfirmDeleteModal'; 

const DeleteButton = ({ fdcId }) => {
  const { removeFavourite } = useFavourites();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await removeFavourite(fdcId);
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn btn-danger">
        Delete
      </button>

      {/* Confirm deletion dialog box */}
      <ConfirmDeleteModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        handleConfirm={handleDelete} 
      />
    </>
  );
};

export default DeleteButton;
