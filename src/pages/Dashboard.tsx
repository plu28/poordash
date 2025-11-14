import Layout from "../components/Layout";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <Layout showBottomNav={true} bottomNavVariant="chef">
      <div className="space-y-6">
        <Header title="Dashboard" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Your Dashboard</h2>
          <p className="text-gray-600">
            View sales, revenue, and rating here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;