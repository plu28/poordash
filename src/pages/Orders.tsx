import Layout from "../components/Layout";
import Header from "../components/Header";

const Orders = () => {
  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title="Your Orders" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Order History</h2>
          <p className="text-gray-600">
            Your past orders will appear here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;