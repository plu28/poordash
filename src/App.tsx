import { useState } from "react";
import Layout from "./components/Layout";
import { Input } from "./components/ui/input";
import "./index.css";
import Header from "./components/Header";
import UserChefCard from "./components/UserChefCard";
import ChefMenuItem from "./components/ChefMenuItem";
import UserOrderContainer from "./components/UserOrderContainer";
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import { Toggle } from "@/components/ui/toggle"

function App() {
	const [userType, setUserType] = useState<"customer" | "chef">("customer");
	const [rating1, setRating1] = useState(0);
	const handleBottomNavAction = (action: string) => {
		console.log("Bottom nav action:", action);
		// Handle navigation based on action
		// Routing logic would go here
	};

	const toggleUserType = () => {
		setUserType((prev) => (prev === "customer" ? "chef" : "customer"));
	};

	return (
		<Layout
			showBottomNav={true}
			bottomNavVariant={userType}
			onBottomNavAction={handleBottomNavAction}
		>
			<div className="space-y-6">
				<Header title="Welcome to Poordash" />

				<div className="flex items-center gap-4">
					<p className="text-sm font-medium">Current view: {userType}</p>
					<button
						onClick={toggleUserType}
						className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
					>
						Switch to {userType === "customer" ? "Chef" : "Customer"} View
					</button>
				</div>

				<div className="space-y-4">
					<div className="bg-white p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl font-semibold mb-3">
							{userType === "customer"
								? "Customer Dashboard"
								: "Chef Dashboard"}
						</h2>
						<p className="text-gray-600 mb-4">
							This is the PoorDash app with a generic layout and bottom
							navigation. The bottom nav changes based on whether you're a
							customer or chef.
						</p>
					</div>
					<Input type="" placeholder="Sample Input" />
					<UserChefCard
						chefName="Lebron James"
						distance={14.2}
						cuisine={["Italian", "American"]}
						rating={4.9}
						imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAHd2tu9iRcRE27Ne8590JlB3L3PSpOoa7xKUsG7Jt9Fe3Xuo_tQLLGrzCstLGIOZ3wLy5nmxtMABX04mdC5Qr77HMkngQgnzq4_TUlzI&s=10"
					/>
					<ChefMenuItem
						mealName="Pasta"
						price={12.95}
						grams={400}
						ingredients={["Pasta", "Sauce"]}
						nutritionFacts={["74g protein", "240 calories"]}
						imageUrl="https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg"
					/>
					<UserOrderContainer
						chefName="Francesca R."
						mealName="4 Cheese Lasagna"
						imageUrl="https://www.raspberriesandkohlrabi.com/wp-content/uploads/2021/12/FeaturedFourCheeseLasagna.jpg"
					/>
				</div>
				<div className="flex flex-col items-center gap-3">
					<Rating value={rating1} onValueChange={setRating1}>
						{Array.from({ length: 5 }).map((_, index) => (
							<RatingButton className="text-yellow-500" key={index} />
						))}
					</Rating>
					<div className="text-center">
						<p className="text-xs text-muted-foreground">Rating: {rating1}</p>
					</div>
				</div> </div>
			<Toggle
				variant="outline"
				className="transition-colors duration-200 data-[state=on]:bg-yellow-200 data-[state=off]:bg-transparent"
			>
				Tag
			</Toggle>
		</Layout>
	);
}

export default App;
