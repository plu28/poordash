import React from "react";

interface UserOrderContainerProps {
  chefName: string;
  mealName: string;
  imageUrl: string;
}

const UserOrderContainer: React.FC<UserOrderContainerProps> = ({
  chefName,
  mealName,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between">
        <p className="font-semibold text-2xl">{chefName}</p>
        <button className="text-red-500 text-base">
          Add a review
        </button>
      </div>

      <p className="font-semibold text-xl ">{mealName}</p>
  
      <img
        src={imageUrl}
        alt={mealName}
        className="w-full h-40 border"
      />
    </div>
  )
}

export default UserOrderContainer;