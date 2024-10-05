import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCatagory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) =>
        prev.filter((category) => category != e.target.value)
      );
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  const toggleSubCatagory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) =>
        prev.filter((subCategory) => subCategory != e.target.value)
      );
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col md:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}

      <div className=" min-w-60 mb-5">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className=" md:hidden y-2 text-lg md:text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <p className=" max-md:hidden y-2 text-lg md:text-xl flex items-center gap-2">
          FILTERS
        </p>
        <div className={`${!showFilter ? "hidden" : ""} md:block`}>
          {/* category filter */}

          <div className="border border-gray-300 pl-5 py-3 mt-6">
            <p className="text-sm font-medium mb-3">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  onChange={toggleCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Men"}
                />{" "}
                Men
              </p>
              <p className="flex gap-2">
                <input
                  onChange={toggleCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Women"}
                />{" "}
                Women
              </p>
              <p className="flex gap-2">
                <input
                  onChange={toggleCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Kids"}
                />{" "}
                Kids
              </p>
            </div>
          </div>
          {/* sub catagory filter */}

          <div className="border border-gray-300 pl-5 py-3 mt-6">
            <p className="text-sm font-medium mb-3">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  onChange={toggleSubCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Topwear"}
                />{" "}
                Topwear
              </p>
              <p className="flex gap-2">
                <input
                  onChange={toggleSubCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Bottomwear"}
                />{" "}
                Bottomwear
              </p>
              <p className="flex gap-2">
                <input
                  onChange={toggleSubCatagory}
                  type="checkbox"
                  className="w-3"
                  value={"Winterwear"}
                />{" "}
                Winterwear
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* products rendering */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
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
    </div>
  );
};

export default Collection;
