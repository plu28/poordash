import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";

const OrderForm = () => {
  const navigate = useNavigate();
  const { chefSlug, mealSlug } = useParams()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [zip, setZip] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [tips, setTips] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkout_form") || "{}");
    if (saved.address) {
    setAddress(saved.address); 
    }
    if (saved.city) {
      setCity(saved.city);
    }
    if (saved.usState) {
      setUsState(saved.usState);
    } 
    if (saved.zip) {
      setZip(saved.zip);
    }
    if (saved.cardNumber) {
      setCardNumber(saved.cardNumber); 
    }
    if (saved.expDate) {
      setExpDate(saved.expDate);
    }
    if (saved.cvv) {
      setCvv(saved.cvv);
    } 
  }, []);

  const saveField = (key: string, value: string) => {
    const field = JSON.parse(localStorage.getItem("checkout_form") || "{}");
    field[key] = value;
    localStorage.setItem("checkout_form", JSON.stringify(field));
  };

  const menu = [
    {
      chefSlug: "lebron-james",
      chefName: "Lebron James",
      menu: [
        {
          mealName: "Pasta",
          mealSlug: "pasta",
          price: 12.95,
          grams: 400,
          ingredients: ["Pasta", "Sauce"],
          nutritionFacts: ["240 calories", "47g protein"],
          imageUrl: "https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg",
        },
        {
          mealName: "14 in pizza",
          mealSlug: "14-in-pizza",
          price: 23.49,
          grams: 700,
          ingredients: ["Dough", "Sauce", "Cheese"],
          nutritionFacts: ["720 calories", "42g protein", "38g fat", "650mg sodium"],
          imageUrl: "https://kitchenatics.com/wp-content/uploads/2020/09/Cheese-pizza-1-500x375.jpg",
        },
      ],
    },
    {
      chefSlug: "gordon-ramsay",
      chefName: "Gordon Ramsay",
      menu: [
        {
          mealName: "Beef Wellington",
          mealSlug: "beef-wellington",
          price: 74.95,
          grams: 120,
          ingredients: ["Beef Tenderloin", "Puff Pastry", "Mushrooms", "Prosciutto"],
          nutritionFacts: ["620 calories", "12g protein", "64g carbs", "55g fat"],
          imageUrl: "https://grillmomma.com/wp-content/uploads/2020/12/IMG_1986-3-scaled-e1609301042548.jpg",
        },
        {
          mealName: "Pan Seared Scallops",
          mealSlug: "pan-seared-scallops",
          price: 29.49,
          grams: 250,
          ingredients: ["Scallops", "Butter", "Garlic", "Lemon Juice", "Salt", "Pepper"],
          nutritionFacts: ["420 calories", "42g protein", "42g carbs", "42g fat"],
          imageUrl: "https://www.inspiredtaste.net/wp-content/uploads/2018/08/Pan-Seared-Scallops-Recipe-1200.jpg",
        },
      ],
    },
  ];

  const chef = menu.find((c) => c.chefSlug === chefSlug);
  const meal = chef?.menu.find((m) => m.mealSlug === mealSlug);

  if (!meal) {
    return <p>Meal not found.</p>;
  }

  const tip = Number(tips) || 0;
  const tax = meal.price * 0.0975;
  const total = meal.price + tax + tip;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!address.trim()) {
      newErrors.address = "Address is required.";
    }
    if (!city.trim()) {
      newErrors.city = "City is required.";
    }
    if (usState.length != 2) {
      newErrors.usState = "State must be a 2-letter code (e.g. CA)."
    }
    if (zip.length != 5) {
      newErrors.zip = "ZIP code must be 5 digits."
    }
    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!/^\d{2}\/\d{2}$/.test(expDate)) {
      newErrors.expDate = "Expiration date must be in MM/YY format.";
    }
    if (cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits.";
    }
    return newErrors;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigate("/confirm-order", {
      state: {
        address,
        city,
        usState,
        zip,
        cardNumber,
        expDate,
        cvv,
        price: meal.price,
        tips: tip,
        total,
        dishName: meal.mealName,
        chefName: chef?.chefName,
        imageUrl: meal.imageUrl,
      },
    });
  };


  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title={meal.mealName} backButton />
        <form
          className="gap-3 bg-white p-4 rounded-lg shadow-sm border"
          onSubmit={handleSubmit}>
          <div className="space-y-2"> 
            Address<span className="text-red-500">*</span>
            <Input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                errors.address && setErrors(prev => ({ ...prev, address: "" }));
                saveField("address", e.target.value);
              }}
              className={errors.address ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""}
            />
            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label>
                  City<span className="text-red-500">*</span>
                  <Input value={city} onChange={(e) => {
                    setCity(e.target.value);
                    errors.city && setErrors(prev => ({ ...prev, city: "" }));
                    saveField("city", e.target.value);
                  }}
                  className={errors.city ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
                  />
                </label>
              </div>
              <div className="flex flex-col w-14">
                <label>
                State<span className="text-red-500">*</span>
                <Input
                  maxLength={2}
                  value={usState}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase().replace(/[^A-Za-z]/g, "");
                    setUsState(value);
                    (errors.usState && value.length === 2) &&
                    setErrors(prev => ({ ...prev, usState: "" }));
                    saveField("usState", value);
                  }}
                  className={errors.usState ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
                />
                </label>
              </div>
              <div className="flex flex-col w-19">
                <label>
                  Zip<span className="text-red-500">*</span>
                <Input
                    maxLength={5}
                    value={zip}
                    onChange={(e) => {
                      const newZip = e.target.value.replace(/\D/g, "");
                      setZip(newZip);
                      (errors.zip && newZip.length === 5) &&
                      setErrors(prev => ({ ...prev, zip: "" }));
                      saveField("zip", newZip);
                    }}
                    className={errors.zip ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
                  />
                </label>
              </div>
            </div>

            <div>
              Card Number<span className="text-red-500">*</span>
              <Input
              maxLength={19}
              value={cardNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "").slice(0, 16);
                let newValue = value.replace(/(.{4})/g, "$1 ").trim();
                  setCardNumber(newValue);
                  (errors.cardNumber && value.length === 16) &&
                  setErrors(prev => ({ ...prev, cardNumber: "" }));
                  saveField("cardNumber", newValue);
                }}
              className={errors.cardNumber ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
              />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <label>
                Exp. Date<span className="text-red-500">*</span>
                <Input
                  value={expDate}
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                    setExpDate(v);
                    (errors.expDate && /^\d{2}\/\d{2}$/.test(v)) &&
                    setErrors(prev => ({ ...prev, expDate: "" }));
                    saveField("expDate", v);
                  }}
                  className={errors.expDate ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
                  />
                </label>
              </div>
              <div className="flex flex-col w-19">
                <label>
                  CVV<span className="text-red-500">*</span>
                <Input
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => {
                      const newCvv = e.target.value.replace(/\D/g, "");
                      setCvv(newCvv);
                      (errors.cvv && newCvv.length === 3) &&
                      setErrors(prev => ({ ...prev, cvv: "" }));
                      saveField("cvv", newCvv);
                    }}
                    className={errors.cvv ? "border-red-500 ring-red-500 focus-visible:ring-red-500" : ""} 
                  />
                </label> 
              </div>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${meal.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Tips</span>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {((Number(tip) / meal.price) * 100 || 0).toFixed(1)}%
                </span>
                <div className="flex items-center border rounded-md w-14">
                  <span className="text-gray-500">$</span>
                  <Input
                    value={tips}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value)) {
                        setTips(value);
                      }
                    }}
                    className="border-none p-0 text-right focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <span><b>Total</b></span>
              <span><b>${total.toFixed(2)}</b></span>
            </div>
          </div>

          {Object.values(errors).some(err => err) && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-md mt-3">
              <ul className="list-disc ml-4 text-sm">
                {Object.values(errors)
                  .filter(err => err)
                  .map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="block w-full bg-black text-white text-center py-3 rounded-lg text-lg font-medium mt-4 hover:bg-gray-900 cursor-pointer">
            Pay ${total.toFixed(2)}
          </button>
          
        </form>
      </div>
    </Layout>
  )



}

export default OrderForm;
