import { useParams } from "react-router";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import ChefMenuItem from "@/components/ChefMenuItem";



const UserMenu = () => {
  const { chefSlug } = useParams();

  const menu = [
  {
    chefSlug: "lebron-james",
    chefName: "Lebron James",
    menu: [
      {
        mealName: "Pasta",
        mealSlug: "pasta",
        price: 12.95,
        grams: 400,
        ingredients: ["Pasta", "Sauce"],
        nutritionFacts: ["240 calories", "47g protein"],
        imageUrl: "https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg",
      },
      {
        mealName: "14 in pizza",
        mealSlug: "14-in-pizza",
        price: 23.49,
        grams: 700,
        ingredients: ["Dough", "Sauce", "Cheese"],
        nutritionFacts: ["720 calories", "42g protein", "38g fat", "650mg sodium"],
        imageUrl: "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1-500x375.jpg",
      },
    ],
  },
  {
    chefSlug: "gordon-ramsay",
    chefName: "Gordon Ramsay",
    menu: [
      {
        mealName: "Beef Wellington",
        mealSlug: "beef-wellington",
        price: 74.95,
        grams: 120,
        ingredients: ["Beef Tenderloin", "Puff Pastry", "Mushrooms", "Prosciutto"],
        nutritionFacts: ["620 calories", "12g protein", "64g carbs", "55g fat"],
        imageUrl: "https://grillmomma.com/wp-content/uploads/2020/12/IMG_1986-3-scaled-e1609301042548.jpg",
      },
      {
        mealName: "Pan Seared Scallops",
        mealSlug: "pan-seared-scallops",
        price: 29.49,
        grams: 250,
        ingredients: ["Scallops", "Butter", "Garlic", "Lemon Juice", "Salt", "Pepper"],
        nutritionFacts: ["420 calories", "42g protein", "42g carbs", "42g fat"],
        imageUrl: "https://www.inspiredtaste.net/wp-content/uploads/2018/08/Pan-Seared-Scallops-Recipe-1200.jpg",
      },
    ],
  },
];

    
  const chef = menu.find((c) => c.chefSlug == chefSlug);
  if (!chef) {
    return <p> Chef not found.</p>
  }

  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title={`${chef.chefName}'s Menu`} backButton />
        <div className="space-y-4">
          {chef.menu.map((item) => (
            <ChefMenuItem
              key={item.mealName}
              chefSlug={chef.chefSlug}
              mealSlug={item.mealSlug}
              mealName={item.mealName}
              price={item.price}
              grams={item.grams}
              ingredients={item.ingredients}
              nutritionFacts={item.nutritionFacts}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>

      </div>
    </Layout>
  )


};

export default UserMenu;
