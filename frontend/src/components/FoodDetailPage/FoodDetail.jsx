import React from 'react';
import { useParams } from 'react-router-dom';
import useFoodDetail from '../../hooks/useFoodDetail';
import FoodNutrientsTable from './FoodNutrientsTable';
import Favourite from './Favourite';

const FoodDetail = () => {
  const { fdcId } = useParams();
  const { foodDetails, loading, error } = useFoodDetail(fdcId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Please contact our supportem：{error}</p>;
  if (!foodDetails) return <p>Can not find the foodlist now</p>;

  return (
    <div>
      <h2>{foodDetails.description}</h2>
      <FoodNutrientsTable nutrients={foodDetails.foodNutrients} />
      <Favourite fdcId={fdcId} description={foodDetails.description} /> {/* Pass description */}
    </div>
  );
};

export default FoodDetail;
