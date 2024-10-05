import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  console.table(products[0]);
  useEffect(() => {
    const bestProducts = products.filter((product) => product.bestseller);
    setBestSellers(bestProducts.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8  text-xl sm:text-2xl lg:text-3xl">
        <Title text1={"BEST "} text2={"SELLERS"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
