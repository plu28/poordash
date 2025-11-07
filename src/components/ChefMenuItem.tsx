import React from "react";

interface ChefMenuItemProps {
  mealName: string;
  price: number;
  grams: number;
  ingredients: string[];
  nutritionFacts: string[];
  imageUrl: string;
}

const ChefMenuItem: React.FC<ChefMenuItemProps> = ({
  mealName,
  price,
  grams,
  ingredients,
  nutritionFacts,
  imageUrl
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3
    bg-white p-6 rounded-lg shadow-sm border">
      <img
        src={imageUrl}
        alt={mealName}
        className="w-32 h-32 rounded-md object-cover border"
      />

      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-xl leading-none -mt-0.5">{mealName}</p>
        <p className="font-semibold text-lg leading-none">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 leading-none">{grams} grams</p>
      </div>

      <div className="text-right">
        <p className="font-medium">Nutrition Facts</p>
        <ul className="text-sm text-gray-700">
          {nutritionFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-medium">Ingredients</p>
        <ul className="text-sm text-gray-700">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ChefMenuItem;
