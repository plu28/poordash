import { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import ChefActiveOrder from "../components/ChefActiveOrder";
import { toast, Toaster } from "sonner";

import type { StateType } from "../types/index";

import { getOrders, updateOrder } from "../lib/orderStorage";

const ChefOrders = () => {
	const [orders, setOrders] = useState(getOrders());

	// Only shows orders which aren't complete or cancelled
	const activeOrders = orders.filter((order) => order.state !== "Complete" && order.state !== "Cancelled")

	const handleStateChange = (id: string, newState: StateType): void => {
		updateOrder(id, { state: newState });
		setOrders(getOrders());
	}

	const handleCancelClick = (id: string, oldState: StateType): void => {
		updateOrder(id, { state: "Cancelled" });
		setOrders(getOrders());
		toast.success("Order has been cancelled", {
			action: {
				label: "Undo",
				onClick: () => {
					updateOrder(id, { state: oldState });
					setOrders(getOrders());
				}
			}
		});
	}

	return (
		<Layout showBottomNav={true} bottomNavVariant="chef">
			<Toaster closeButton position="top-center" />
			<div className="space-y-6">
				<Header title="Orders" />
				{activeOrders.length !== 0 &&
					activeOrders.map((order) => {
						return (
							<ChefActiveOrder
								key={order.id}
								id={order.id}
								dishName={order.dishName}
								price={order.price}
								options={order.options}
								imageUrl={order.imageUrl}
								state={order.state}
								delivery={order.delivery}
								orderDate={order.orderDate}
								onChangeState={handleStateChange}
								onCancelOrder={handleCancelClick}
							/>
						)
					})
				}
				{activeOrders.length === 0 &&
					<p className="text-gray-600">
						You currently don't have any active orders.
					</p>
				}
			</div>
		</Layout>
	);
};

export default ChefOrders;
