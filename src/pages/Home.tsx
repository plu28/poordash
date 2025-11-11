import Layout from "../components/Layout";
import Header from "../components/Header";
import UserChefCard from "../components/UserChefCard";

const Home = () => {
  const chefs = [
    {
      chefName: "Lebron James",
      slug: "lebron-james",
      distance: 14.2,
      cuisine: ["Italian", "American"],
      rating: 4.9,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAHd2tu9iRcRE27Ne8590JlB3L3PSpOoa7xKUsG7Jt9Fe3Xuo_tQLLGrzCstLGIOZ3wLy5nmxtMABX04mdC5Qr77HMkngQgnzq4_TUlzI&s=10",
    },
    {
      chefName: "Gordon Ramsay",
      slug: "gordon-ramsay",
      distance: 8.1,
      cuisine: ["British", "French"],
      rating: 4.8,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmIg5ndNSuWsPTO-KHZAzzV69oc5tVQXSIBAGjq3B6Wt70w6chyZHRleKJ7XwddhiCN8Ufj8rMeu2ZJ1pTaHuX98q__oN7PxAUXk1KRic&s=10",
    },
  ];

  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title="Welcome to Poordash" />
        <div className="space-y-4">
          {chefs.map((chef, index) => (
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
      </div>
    </Layout>
  );
};

export default Home;