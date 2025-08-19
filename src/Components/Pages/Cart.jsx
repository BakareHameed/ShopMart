import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const fixedCart = storedCart.map((item) => ({
      ...item,
      Price: parseFloat(item.Price),
      quantity: item.quantity || 1,
    }));
    setCart(fixedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.Id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from cart"
    );
    if (!confirmRemove) return;
    const updatedCart = cart.filter((item) => item.Id !== id);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();
    if (code === "freeship10") {
      setDiscount(10);
      toast.success("10% discount applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon Code");
    }
  };
 const subtotal = cart.reduce(
  (acc, item) => acc + Number(item.Price) * Number(item.quantity),
  0
);

const shipping = cart.length ? 300 : 0;
const discountAmount = (subtotal * discount) / 100;
const total = subtotal - discountAmount + shipping;

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout");
  };

  return (
    <div className="px-4 sm:px-8 lg:px-[12%] py-12 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-600 font-bricolage">
        My Shopping Cart
      </h1>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-200">
              <th className="w-12 text-center"></th> {/* 👈 define width */}
              <th className="text-center">Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr
                key={item.Id}
                className="bg-white border rounded-xl shadow-xm"
              >
                {/* ❌ remove button */}
                <td className="text-center align-middle">
                  <button
                    onClick={() => removeFromCart(item.Id)}
                    className="text-xl text-gray-400 hover:text-red-500"
                  >
                    <i className="ri-close-line"></i> {/* 👈 check icon name */}
                  </button>
                </td>

                {/* ✅ wrap flex inside div instead of td */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.ProductsImage}
                      alt={item.Name}
                      className="w-24 h-24 object-contain border p-2 rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.Name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.Category}</p>
                    </div>
                  </div>
                </td>

                <td className="text-center text-gray-800 font-medium">
                  ${item.Price.toFixed(2)}
                </td>

                <td className="text-center">
                  <div className="inline-flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.Id, -1)}
                      className="px-3 py-1 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.Id, 1)}
                      className="px-3 py-1 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="text-center font-semibold text-gray-800">
                  ${(item.Price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}

            {cart.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  <i className="ri-shpping-cart-line text-2xl mr-2">
                    Your Cart is Empty!
                  </i>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-6">
        {cart.map((item) => (
          <div
            key={item.Id}
            className="bg-white border rounded-xl shadow-sm p-4 flex gap-4 items-start"
          >
            {/* Image */}
            <img
              src={item.ProductsImage}
              alt={item.Name}
              className="w-20 h-20 object-contain border p-2 rounded-lg"
            />

            {/* Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.Name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.Category}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.Id)}
                  className="text-xl text-gray-400 hover:text-red-500"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {/* Price & Quantity */}
              <div className="mt-2 flex justify-between items-center">
                <p className="text-gray-800 font-medium">
                  ${item.Price.toFixed(2)}
                </p>
                <div className="inline-flex items-center border rounded overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.Id, -1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.Id, 1)}
                    className="px-3 py-1 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <p className="mt-2 text-sm font-semibold text-gray-800">
                Total: ${(item.Price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <i className="ri-shopping-cart-line text-2xl mr-2"></i>
            Your Cart is Empty!
          </div>
        )}
      </div>

      {/* Coupon Section */}
      {/* <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md-1/2 flex">
          <input type="text" placeholder="Coupon Code " />
        </div>
      </div> */}

      {/* Cart Totals */}
      <div className="mt-12 md:w-1/3 ml-auto border rounded-lg shadow bg-white">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Cart Totals</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full py-3 rounded-full bg-yellow-400 hover:bg-yellow-400 text-white font-semilbold transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
