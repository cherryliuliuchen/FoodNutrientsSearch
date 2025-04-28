import React from 'react';

const FoodNutrientsTable = ({ nutrients }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nutrient Name</th>
          <th>Value</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        {nutrients.map((nutrient, index) => (
          <tr key={index}>
            <td>{nutrient.nutrientName}</td>
            <td>{nutrient.value}</td>
            <td>{nutrient.unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodNutrientsTable;
