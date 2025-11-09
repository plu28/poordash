import Layout from "../components/Layout";
import Header from "../components/Header";
import ChefActiveOrder from "../components/ChefActiveOrder";

import type { Order } from "../types/index";

import { getOrders, updateOrder } from "../lib/orderStorage";

const ChefOrders = () => {

	const orders: Order[] = getOrders();

	// Subset of orders which arent complete
	const activeOrders = orders.filter((order) => order.state !== "Complete")

	return (
		<Layout showBottomNav={true} bottomNavVariant="chef">
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
								deliveryAddress={order.deliveryAddress}
								orderDate={order.orderDate}
								onChangeState={updateOrder}
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
