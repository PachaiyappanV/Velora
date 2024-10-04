import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const List = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      setProducts(res.data.data.products);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return <div>List</div>;
};

export default List;
