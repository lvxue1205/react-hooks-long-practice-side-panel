import { React, useState } from "react";
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import "./ProductView.css";
import { useEffect } from "react";

function ProductView({ products }) {
  const [sideOpen, setSideOpen] = useState(
    localStorage.getItem("sideOpen") === "false" ? false : true
  );
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log(`selectedProduct CHANGED TO`, selectedProduct);
    if (selectedProduct != null) {
      setSideOpen(true);
    }
  }, [selectedProduct]);

  useEffect(() => {
    console.log(`sideOpen CHANGED TO`, sideOpen);
    if (!sideOpen) {
      setSelectedProduct(null);
    }
    localStorage.setItem("sideOpen", sideOpen);
  }, [sideOpen]);

  console.log("LOG before return in ProductView.");
  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              isSelected={selectedProduct && selectedProduct.id === item.id}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div
            className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? ">" : "<"}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
