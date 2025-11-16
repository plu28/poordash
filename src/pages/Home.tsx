import Layout from "../components/Layout";
import Header from "../components/Header";
import UserChefCard from "../components/UserChefCard";
import { getOrders } from "@/lib/orderStorage";
import type { Order } from "@/types";
import { useEffect, useState } from "react";
import ChefMenuItem from "@/components/ChefMenuItem";


const Home = () => {
  const chefsWithMenu = [
    {
      chefName: "Lebron James",
      slug: "lebron-james",
      distance: 14.2,
      cuisine: ["Italian", "American"],
      rating: 4.9,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAHd2tu9iRcRE27Ne8590JlB3L3PSpOoa7xKUsG7Jt9Fe3Xuo_tQLLGrzCstLGIOZ3wLy5nmxtMABX04mdC5Qr77HMkngQgnzq4_TUlzI&s=10",
      menu: [
        {
          mealName: "Pasta",
          mealSlug: "pasta",
          price: 12.95,
          grams: 400,
          ingredients: ["Pasta", "Sauce"],
          nutritionFacts: ["240 calories", "47g protein"],
          imageUrl:
            "https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg",
        },
        {
          mealName: "14 in pizza",
          mealSlug: "14-in-pizza",
          price: 23.49,
          grams: 700,
          ingredients: ["Dough", "Sauce", "Cheese"],
          nutritionFacts: [
            "720 calories",
            "42g protein",
            "38g fat",
            "650mg sodium",
          ],
          imageUrl:
            "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1-500x375.jpg",
        },
      ],
    },

    {
      chefName: "Gordon Ramsay",
      slug: "gordon-ramsay",
      distance: 8.1,
      cuisine: ["British", "French"],
      rating: 4.8,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmIg5ndNSuWsPTO-KHZAzzV69oc5tVQXSIBAGjq3B6Wt70w6chyZHRleKJ7XwddhiCN8Ufj8rMeu2ZJ1pTaHuX98q__oN7PxAUXk1KRic&s=10",
      menu: [
        {
          mealName: "Beef Wellington",
          mealSlug: "beef-wellington",
          price: 74.95,
          grams: 120,
          ingredients: [
            "Beef Tenderloin",
            "Puff Pastry",
            "Mushrooms",
            "Prosciutto",
          ],
          nutritionFacts: ["620 calories", "12g protein", "64g carbs", "55g fat"],
          imageUrl:
            "https://grillmomma.com/wp-content/uploads/2020/12/IMG_1986-3-scaled-e1609301042548.jpg",
        },
        {
          mealName: "Pan Seared Scallops",
          mealSlug: "pan-seared-scallops",
          price: 29.49,
          grams: 250,
          ingredients: [
            "Scallops",
            "Butter",
            "Garlic",
            "Lemon Juice",
            "Salt",
            "Pepper",
          ],
          nutritionFacts: ["420 calories", "42g protein", "42g carbs", "42g fat"],
          imageUrl:
            "https://www.inspiredtaste.net/wp-content/uploads/2018/08/Pan-Seared-Scallops-Recipe-1200.jpg",
        },
      ],
    },
  ];


  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  useEffect(() => {
    const allOrders = getOrders().slice().reverse();
    const uniqueOrders = Array.from(
      new Map(allOrders.map(o => [`${o.chefName}-${o.dishName}`, o])).values()
    );
    setRecentOrders(uniqueOrders.slice(0, 2));
  }, []);

  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title="Welcome to Poordash" />
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-gray-900"> Choose a Chef</h1>
          {chefsWithMenu.map((chef, index) => (
            <UserChefCard
              key={index}
              slug={chef.slug}
              chefName={chef.chefName}
              distance={chef.distance}
              cuisine={chef.cuisine}
              rating={chef.rating}
              imageUrl={chef.imageUrl}
            />
          ))}
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-gray-900"> Order Again</h1>
          {recentOrders.length == 0 && (
            <p className="text-gray-600"> No previous orders.</p>
          )}
          {recentOrders.map((order) => {
            const chef = chefsWithMenu.find((c) => c.chefName === (order as any).chefName);
            if (!chef) {
              return null;
            } 
            const meal = chef.menu.find((m) => m.mealName === (order as any).dishName);
            if (!meal) {
              return null;
            } 
            return (
              <ChefMenuItem
                key={order.id}
                chefSlug={chef.slug}
                mealSlug={meal.mealSlug}
                mealName={meal.mealName}
                price={meal.price}
                grams={meal.grams}
                ingredients={meal.ingredients}
                nutritionFacts={meal.nutritionFacts}
                imageUrl={meal.imageUrl}
                inHome={true}
                chefName={chef.chefName}
                lastOrdered={order.orderDate}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;