import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/order/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data.data.orders);
    } catch (err) {
      if (err.response.data.status === "fail") {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong please try again later");
      }
    }
  };

  const statusHandler = async (orderId, status) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/order/status`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getOrders();
    } catch (err) {
      if (err.response.data.status === "fail") {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong please try again later");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.reverse().map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
          gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.products.map((product, index) => {
                  if (index === order.products.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {product.name} X {product.quantity}{" "}
                        <span>{product.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {product.name} X {product.quantity}{" "}
                        <span>{product.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zip}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.products.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.amount}</p>
            <select
              onChange={(e) => statusHandler(order._id, e.target.value)}
              value={order.status}
              className="p-2 font-semibold "
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
