import { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";

const Profile = () => {
const [userType, setUserType] = useState<"customer" | "chef">(() => {
  return (localStorage.getItem("userType") as "customer" | "chef") || "customer";
});

const toggleUserType = () => {
  setUserType((prev) => {
    const newType = prev === "customer" ? "chef" : "customer";
    localStorage.setItem("userType", newType);
    return newType;
  });
};

  return (
    <Layout showBottomNav={true} bottomNavVariant={userType}>
      <div className="space-y-6">
        <Header title="Profile" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Profile Settings</h2>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-sm font-medium">Current role: {userType}</p>
            <button
              onClick={toggleUserType}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              Switch to {userType === "customer" ? "Chef" : "Customer"}
            </button>
          </div>
          <p className="text-gray-600">
            Manage your profile and switch between customer and chef roles.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;