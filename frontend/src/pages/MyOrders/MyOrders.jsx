import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Razorpay Payment
  const handlePayment = async (order) => {
    try {
      const response = await axios.post(url + "/api/order/pay", { orderId: order._id, amount: order.amount }, { headers: { token } });

      if (!response.data.success) {
        alert("Error initiating payment.");
        return;
      }

      const { orderId, amount, key } = response.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Food Delivery",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await axios.post(
            url + "/api/order/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order._id,
            },
            { headers: { token } }
          );

          if (verifyResponse.data.success) {
            alert("Payment Successful!");
            fetchOrders(); // Refresh orders
          } else {
            alert("Payment Verification Successfull!");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2 className="myordersp">My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1 ? item.name + " x " + item.quantity : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            {order.payment ? (
              <button onClick={fetchOrders}>Track Order</button>
            ) : (
              <button onClick={() => handlePayment(order)}>Paid</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
