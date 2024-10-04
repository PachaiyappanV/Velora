import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
const List = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(res.data.data.products);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message);
      getProducts();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* product list */}
        {products.map((product) => {
          return (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] 
              items-center py-1 px-2 gap-2 border text-sm"
              key={product._id}
            >
              <img className="w-12 h-12" src={product.image[0]} alt="" />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>${product.price}</p>

              <RiDeleteBinLine
                onClick={() => removeProduct(product._id)}
                className="cursor-pointer text-lg  text-red-500 ml-auto md:mx-auto"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
