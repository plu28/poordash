import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { useLocation, useNavigate } from "react-router";
import { addOrder } from "@/lib/orderStorage";
import type { Order, Delivery } from "@/types";

const ConfirmOrder = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("STATE:", state);
  if (!state) {
    return <p>Cannot confirm order.</p>
  }

  const {
    dishName,
    imageUrl,
    chefName,
    address,
    city,
    usState,
    zip,
    cardNumber,
    tips,
    price,
  } = state;

  const tax = price * 0.0975;
  const total = price + tax + Number(tips || 0);

  const handlePlaceOrder = () => {
    const delivery: Delivery = {
      address,
      city,
      usState,
      zip,
    }
    const newOrder: Order = {
      id: crypto.randomUUID(),
      chefName,
      dishName,
      imageUrl,
      orderDate: new Date().toISOString(),
      delivery,
			state: "NotStarted",
			price: price + Number(tips || 0)
    };

    addOrder(newOrder);
    navigate("/order-confirmed")
  }

  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title="Confirm Order" backButton />
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div>
            <p className="text-xs text-gray-500 font-semibold">CHEF</p>
            <p className="font-semibold text-lg">{chefName}</p>
          </div>
          <div className="mt-3 mb-2">
            <p className="text-xs text-gray-500 font-semibold">ORDER</p>
            <p className="font-semibold text-lg">{dishName}</p>
          </div>
          <hr />
          <div className="mt-3 mb-2">
            <p className="text-xs text-gray-500 font-semibold">DELIVERY ADDRESS</p>
            <p>{address}</p>
            <p>{city}, {usState} {zip}</p>
          </div>
          <hr />
          
          <div className="mt-3 mb-2">
            <p className="text-xs text-gray-500 font-semibold">PAYMENT</p>
            <p>Card ending in {cardNumber.slice(-4)}</p>
          </div>


          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${price}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tips</span>
            <span>${Number(tips || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span><b>Total</b></span>
            <span><b>${total.toFixed(2)}</b></span>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="block w-full bg-black text-white text-center py-3 rounded-lg text-lg font-medium mt-4 hover:bg-gray-900 cursor-pointer">
            Confirm and Place Order
          </button>
          
        </div>
      </div>
    </Layout>
  )
};

export default ConfirmOrder;
