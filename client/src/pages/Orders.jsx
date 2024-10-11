import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { apiUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/order/userOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let allOrders = [];
      data.data.orders.map((order) => {
        order.products.map((product) => {
          product["status"] = order.status;
          product["payment"] = order.payment;
          product["paymentMethod"] = order.paymentMethod;
          product["date"] = order.date;

          allOrders.push(product);
        });
      });

      setOrderData(allOrders.reverse());
    } catch (error) {
      if (error.response.data.status === "fail") {
        toast.error(error.response.data.message);
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
    <div className="border-t pt-16">
      <div className="flex text-2xl">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>
      <div className="">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col 
            md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 mb-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>
                  Date:
                  <span className=" text-gray-400">
                    {" " + new Date(item.date).toDateString()}
                  </span>
                </p>
                <p>
                  Payment:
                  <span className=" text-gray-400">
                    {" " + item.paymentMethod.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-400"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={getOrders}
                className="border px-4 py-2 text-sm font-medium rounded-sm "
              >
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
