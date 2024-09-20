import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];

      productsCopy = productsCopy.filter((item) => item.category === category);
      productsCopy = productsCopy.filter(
        (item) => item.subCategory === subCategory
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className=" my-16">
      <div className="text-center text-2xl sm:text-3xl pb-7">
        <Title text1={"RELATED "} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item) => (
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

export default RelatedProducts;
