import { useState } from "react";
import Layout from "./components/Layout";
import { Input } from "./components/ui/input";
import "./index.css";

function App() {
  const [userType, setUserType] = useState<"customer" | "chef">("customer");

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
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to PoorDash
        </h1>

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
		<Input type="" placeholder="Sample Input"/>
        </div>
      </div>
    </Layout>
  );
}

export default App;
