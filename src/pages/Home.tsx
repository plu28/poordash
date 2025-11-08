import Layout from "../components/Layout";
import Header from "../components/Header";
import UserChefCard from "../components/UserChefCard";

const Home = () => {
  const chefs = [
    {
      chefName: "Lebron James",
      distance: 14.2,
      cuisine: ["Italian", "American"],
      rating: 4.9,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxAHd2tu9iRcRE27Ne8590JlB3L3PSpOoa7xKUsG7Jt9Fe3Xuo_tQLLGrzCstLGIOZ3wLy5nmxtMABX04mdC5Qr77HMkngQgnzq4_TUlzI&s=10",
    },
    {
      chefName: "Gordon Ramsay",
      distance: 8.1,
      cuisine: ["British", "French"],
      rating: 4.8,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Gordon_Ramsay.jpg",
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