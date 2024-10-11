import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems, apiUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/order/verifyStripe`,
        { success, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems({});
      navigate("/orders");
      toast.success(data.message);
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
      verifyPayment();
    }
  }, [token]);

  return <div></div>;
};

export default Verify;
