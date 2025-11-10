import Layout from "@/components/Layout";
import { Link } from "react-router";

const OrderConfirmed = () => {
  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-2">Order Placed!</h2>
        <p className="text-gray-600">
          Your order has been received.
        </p>
        <Link
          to="/customer-orders"
          className="block w-full bg-black text-white text-center py-3 rounded-lg text-lg font-medium mt-4"
        >
          View My Orders
        </Link>
      </div>
    </Layout>
  );
};

export default OrderConfirmed;
