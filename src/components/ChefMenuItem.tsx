import React from "react";
import { Link } from "react-router";

interface ChefMenuItemProps {
  chefSlug: string;
  mealSlug: string;
  mealName: string;
  price: number;
  grams: number;
  ingredients: string[];
  nutritionFacts: string[];
  imageUrl: string;
  inHome?: boolean;
  chefName?: string;
  lastOrdered?: string; 
}

const ChefMenuItem: React.FC<ChefMenuItemProps> = ({
  chefSlug,
  mealSlug,
  mealName,
  price,
  grams,
  ingredients,
  nutritionFacts,
  imageUrl,
  inHome,
  chefName,
  lastOrdered,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/order/${chefSlug}/${mealSlug}`}
      className="grid grid-cols-[auto_1fr] gap-3
    bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <img
        src={imageUrl}
        alt={mealName}
        className="w-32 h-32 rounded-md object-cover border"
      />

      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-2xl leading-none -mt-0.5">{mealName}</p>
        <p className="font-semibold text-lg leading-none">${price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 leading-none">{grams} grams</p>
        {inHome && (
          <div className="text-sm text-gray-600">
            <p>Chef {chefName}</p>
            {lastOrdered && <p>Last ordered {formatDate(lastOrdered)}</p>}
          </div>
        )}

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
          {ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default ChefMenuItem;
