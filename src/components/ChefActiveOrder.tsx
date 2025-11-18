import React from "react";
import { Button } from "./ui/button";

import type { Order, StateType } from "../types/index"

type ChefActiveOrderProps = Order & {
	onChangeState: (id: string, newState: StateType) => void;
}

const ChefActiveOrder: React.FC<ChefActiveOrderProps> = ({
	id,
	dishName,
	orderDate,
	price,
	options,
	imageUrl,
	state,
	onChangeState,
	delivery,
}) => {


	const dateFormatted = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(orderDate));

	const currencyFormatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);

	let deliveryFormatted
	if (delivery) {
		deliveryFormatted = `${delivery.address}, ${delivery.city} ${delivery.zip}`;
	}

	return (
		<div className="flex flex-row bg-white gap-x-4 p-6 rounded-lg shadow-sm border relative">
			<div className="flex flex-col gap-y-4 w-full">
				<div className="flex flex-col gap-y-3">
					<p className="font-semibold text-xl leading-none -mt-0.5">{dishName}</p>
					<p className="text-gray-500 text-lg leading-none -mt-0.5">{currencyFormatted}</p>
				</div>
				<div className="">
					<p className="font-semibold text-md ">Options</p>
					{options && options.length !== 0 ? (
						<ol className="list-decimal ml-6">
							{options.map((option) => {
								return (
									<li key={option} className="font-light">
										<i>{option}</i>
									</li>
								)
							})}
						</ol>
					)
						:
						(<p className="font-light text-md italic">No Options Articulated</p>)
					}
				</div>

				<div>
					<p className="font-semibold text-md">Delivery</p>
					{deliveryFormatted ? 
						<p className="font-light leading-none">{deliveryFormatted}</p>
						:
						<p className="text-gray-500 text-md leading-none">Customer will pickup when the order is ready.</p>
					}
				</div>

			</div>
			<div className="flex flex-col gap-y-2 w-full">
				<p className="text-gray-500 text-sm leading-none text-right -mt-0.5">{dateFormatted}</p>
				<img
					src={imageUrl}
					alt={dishName}
					className="w-32 h-32 rounded-md object-cover shadow-xl border ml-auto"
				/>
			</div>
			<div className="absolute bottom-4 right-4">
				{state === "Not Started" && (
					<Button onClick={() => onChangeState(id, "In Progress")} className="bg-orange-200 hover:bg-orange-100 shadow-lg rounded-4xl min-w-[175px] cursor-pointer" variant="outline">Mark As In Progress</Button>
				)}

				{state === "In Progress" && (
					<Button onClick={() => onChangeState(id, "Ready")} className="bg-yellow-100 hover:bg-yellow-100 shadow-lg rounded-4xl min-w-[175px] cursor-pointer" variant="outline">Mark As Ready</Button>
				)}

				{state === "Ready" && (
					<Button onClick={() => onChangeState(id, "Complete")} className="bg-green-200 hover:bg-green-100 shadow-lg rounded-4xl min-w-[175px] cursor-pointer" variant="outline">Mark As Complete</Button>
				)}
			</div>
		</div>
	)
}

export default ChefActiveOrder;
