import React, { useEffect, useState } from "react";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("bank");
  const [discount, setDiscount] = useState(100);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      Price: parseFloat(item.price),
      quantity: item.quantity || 1,
    }));
    setCart(updatedCart);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.Price * item.quantity,
    0
  );
  const shipping = cart.length ? 300 : 0;
  const total = subtotal + shipping - discount;

  const paymentOption = ({ id, label }) => (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 p-4 border rounded-md cursor-pointer transition-all ${
        selectedPayment === id
          ? "border-yellow-400 bg-yellow-50 shadow-sm "
          : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        id={id}
        name="payment"
        value={id}
        checked={selectedPayment === id}
        onChange={() => setSelectedPayment(id)}
        className="mt-1 w-4 h-4 `text-yellow-400 accent-yellow-400"
      />
      <span className="text-sm">{label}</span>
    </label>
  );

  return (
    <>
      <div className="min-h-screen px-[8%] lg:px-[12%] py-14 bg-white text-gray-800">
        <h1 className="text-5xl font-bricolage font-semibold text-center mb-10">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Billing Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-xl mb-6">Billing Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="bloxk text-sm  font-medium mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="Jack"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="bloxk text-sm  font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Wilshere"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Country *
                </label>
                <select className="w-full border rounded-md px-4 py-2">
                  <option>Select Country</option>
                  <option>Nigeria</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  placeholder="55 shomolu lagos"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Apt, Suit, Etc, *
                </label>
                <input
                  type="text"
                  placeholder="YC7B 7UT"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="Lagos"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Postcode/Zip *
                </label>
                <input
                  type="text"
                  placeholder="000"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  <select className="w-full border rounded-md px-4 py-2">
                    <option>Select State</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="jackdaripper@gmail.com"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm  font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="+234 8165473879"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

            </form>

            {/* Additional Options */}
            <div className="mt-6 space-y-4">
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-yellow-400"/>
                Create an Account
              </label>
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-yellow-400"/>
                Ship to a different address?
              </label>
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Order Notes *
                </label>
                <textarea className="w-full border rounded-md px-4 py-3 min-h-[100px]" placeholder="Notes about your order, e.g Special delivery instructions"></textarea>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-8 rounded-xl h-fit border shadow-xm">
            <h2 className="text-xl font-semibold mb-6">Your Order</h2>
            <div className="space-y-3 text-sm">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>{item.Name}</span>
                  <span>${(item.Price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr className="my-2"/>
              <div className="flex justify-between text-gray-500">
                <span>subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 border-t pt-2">
                <span>total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {/* Payment Method */}
            {/* <div className="mt-6 space-y-3">
              <PaymentOption id='bank' label='Direct Bank Transfer'>
                <div className="text-xs text-gray-600 m-6">
                  Make Your Payment Directly Into Our Bank Account
                </div>
              </PaymentOption>
              <PaymentOption id='check' label='Check Payments'/>
              <PaymentOption id='bitcoin' label='bitcoin'/>
              <PaymentOption id='PayPal' label='PayPal'/>
            </div> */}

            {/* Terms */}
            <div className="mt-6 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox"  className='accent-yellow-400' required/>
                I Have Read and Agreed To The Website's <span className="text-blue-600 underline cursor-pointer">Terms and Conditions</span>
              </label>
            </div>
            <button className='mt-6 w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-md transition'>
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
