"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import "./nav.css";

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
  category: string;
}

const targetCategories = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "skin-care",
  "smartphones",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
];

const LatestPro: React.FC = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      const fetchedProducts: Product[] = [];

      try {
        for (const category of targetCategories) {
          const res = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();

          if (data.products.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * data.products.length
            );
            fetchedProducts.push(data.products[randomIndex]);
          }
        }
        setProducts(fetchedProducts.slice(0, 8));
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  const handleAddToCart = (data: Product) => {
    if (!user) {
      router.push("/login");
      return;
    }

    addToCart({
      id: data.id,
      thumbnail: data.thumbnail,
      title: data.title,
      price: data.price,
      quantity: 1,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(products.length);
  return (
    <div className="w-full bg-white rounded-3xl lg:p-12 p-2 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-grid">
          {products.length > 0 ? (
            products.map((data) => (
              <div key={data.id} className="shadow-md mb-4 pro-cards">
                <div className="w-full h-[55%] rounded-t-lg flex items-center justify-center border rounded-lg home-list">
                  <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="object-cover h-full w-auto"
                  />
                </div>
                <div className="w-[100%] flex justify-between items-center p-4 title-price">
                  <h2 className="font-semibold">{data.title}</h2>
                  <span className="text-lg font-bold">
                    ${data.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 text-2 px-4 mb-2">
                  {data.description.slice(0, 35)}...
                </p>
                <div className="flex justify-between mb-4 buton-div">
                  <button
                    onClick={() => handleAddToCart(data)}
                    className="bg-grey-500 text-white px-4 py-2 rounded w-full mr-2 buton-one allbuton"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded w-full buton-two allbuton"
                    onClick={() => console.log("View Details")}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestPro;
