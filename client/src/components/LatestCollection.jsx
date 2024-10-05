import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8  text-xl sm:text-2xl lg:text-3xl">
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
      </div>
      {/* rendering products*/}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
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

export default LatestCollection;
