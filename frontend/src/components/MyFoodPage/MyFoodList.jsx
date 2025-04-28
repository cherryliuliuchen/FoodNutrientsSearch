import React from 'react';
import useFavourites from '../../hooks/useFavourites';
import DeleteButton from './DeleteButton';

const MyFoodList = () => {
  const { favourites, loading, error } = useFavourites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Please contact with our support team：{error}</p>;

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map(food => (
            <tr key={food.fdcId}>
              <td>{food.description}</td>
              <td><DeleteButton fdcId={food.fdcId} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodList;
