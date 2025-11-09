import React from "react";
import { Button } from "./ui/button";

import type { Order } from "../types/index"

type ChefActiveOrderProps = Order & {
	onChangeState: (orderId: string, updates: Partial<Order>) => void;
}

const ChefActiveOrder: React.FC<ChefActiveOrderProps> = ({
	id,
	dishName,
	orderDate,
	price,
	options,
	imageUrl,
	state,
	deliveryAddress,
	onChangeState,
}) => {
	return (
		<div className="flex flex-row bg-white gap-y-4 p-6 rounded-lg shadow-sm border">
			<div className="flex flex-col gap-y-2">
				<p className="font-semibold text-xl leading-none -mt-0.5">{dishName}</p>
				<img
					src={imageUrl}
					alt={dishName}
					className="w-32 h-32 rounded-md object-cover border"
				/>
				<p className="font-semibold text-lg leading-none">${price.toFixed(2)}</p>
				{deliveryAddress &&
					<p className="font-semibold text-lg leading-none">Deliver To ${deliveryAddress}</p>
				}

				{state === "NotStarted" && (
					<Button onClick={() => onChangeState(id, {state: "InProgress"})} className="bg-orange-200 hover:bg-orange-100" variant="outline">Mark Order As In Progress</Button>
				)}

				{state === "InProgress" && (
					<Button onClick={() => onChangeState(id, {state: "Ready"})} className="bg-yellow-200 hover:bg-yellow-100" variant="outline">Mark Order As Ready</Button>
				)}

				{state === "Ready" && (
					<Button onClick={() => onChangeState(id, {state: "Complete"})} className="bg-green-200 hover:bg-green-100" variant="outline">Mark Order As Complete</Button>
				)}
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
