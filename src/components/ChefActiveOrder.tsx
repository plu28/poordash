import React from "react";
import { Button } from "./ui/button";

interface ChefMenuItemProps {
	mealName: string;
	price: number;
	options: string[];
	imageUrl: string;
	deliveryAddress?: string;
}

const ChefActiveOrder: React.FC<ChefMenuItemProps> = ({
	mealName,
	price,
	options,
	deliveryAddress,
	imageUrl
}) => {
	return (
		<div className="flex flex-row bg-white gap-y-4 p-6 rounded-lg shadow-sm border">
			<div className="flex flex-col gap-y-2">
				<p className="font-semibold text-xl leading-none -mt-0.5">{mealName}</p>
				<img
					src={imageUrl}
					alt={mealName}
					className="w-32 h-32 rounded-md object-cover border"
				/>
				<p className="font-semibold text-lg leading-none">${price.toFixed(2)}</p>
				{deliveryAddress &&
					<p className="font-semibold text-lg leading-none">Deliver To ${deliveryAddress}</p>
				}
				<Button className="bg-green-200 hover:bg-green-100" variant="outline">Mark Order As In Progress</Button>
			</div>
			<div className="">
				<p className="font-semibold text-md">Options</p>
				{options && (
					<ul>
						{options.map((option) => {
							return (
								<li className="font-light">
									<i>{option}</i>
								</li>
							)
						})}
					</ul>
				)}
				{!options && (
					<p className="font-light text-md italic">No Options Articulated</p>
				)}
			</div>
		</div>
	)
}

export default ChefActiveOrder;
