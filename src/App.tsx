import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import CustomerOrders from "./pages/CustomerOrders";
import ChefOrders from "./pages/ChefOrders";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/customer-orders" element={<CustomerOrders />} />
      <Route path="/chef-orders" element={<ChefOrders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
