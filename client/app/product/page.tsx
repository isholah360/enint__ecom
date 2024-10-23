
import React from "react";
import AllProduct from "@/lib/api";
import ProductList from "../../compoent/ProductList"; // Create this component

export default async function Products() {
  const allProduct: Promise<Product[]> = AllProduct();
  const product = await allProduct;

  return (
    <div className="container mx-auto px-4">
      <ProductList products={product.products} />
    </div>
  );
}
