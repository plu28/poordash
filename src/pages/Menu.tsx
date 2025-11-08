import Layout from "../components/Layout";
import Header from "../components/Header";

const Menu = () => {
  return (
    <Layout showBottomNav={true} bottomNavVariant="chef">
      <div className="space-y-6">
        <Header title="Menu" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Chef Menu</h2>
          <p className="text-gray-600">
            Manage your menu items and pricing.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Menu;