

import React from "react";
import AllProduct from "@/lib/api";
import ProductList from "../../compoent/ProductList";

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
 
}

export default async function Products() {
  const productData = await AllProduct(); 
  const products: Product[] = productData.products || []; 

  return (
    <div className="container mx-auto px-4">
      <ProductList products={products} /> 
    </div>
  );
}

