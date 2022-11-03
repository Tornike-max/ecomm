import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Loading from "../share/loading";
import ProductCard from "./ProductCard";

const MainPage = () => {
  const { mainPageProduct, mainPageLoading } = useContext(ProductContext);
  return (
    <div>
      {mainPageLoading && <Loading />}
      {mainPageProduct.product?.length > 0 &&
        mainPageProduct.product.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
    </div>
  );
};

export default MainPage;
