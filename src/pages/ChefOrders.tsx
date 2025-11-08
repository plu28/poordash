import Layout from "../components/Layout";
import Header from "../components/Header";

const ChefOrders = () => {
  return (
    <Layout showBottomNav={true} bottomNavVariant="chef">
      <div className="space-y-6">
        <Header title="Orders" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Chef Order Management</h2>
          <p className="text-gray-600">
            Manage incoming orders and order status here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ChefOrders;