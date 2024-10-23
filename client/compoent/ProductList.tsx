"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import "./nav.css";

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
  category: string;
}

const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "https://dummyjson.com/products";

      if (searchTerm) {
        url = `https://dummyjson.com/products/search?q=${searchTerm}`;
      } else if (filterTerm) {
        url = `https://dummyjson.com/products/category/${filterTerm}`;
      }
      /* the change */
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    };

    fetchProducts();
  }, [searchTerm, filterTerm]);

  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products];

      // Sort by price
      sorted.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

      setSortedProducts(sorted);
    };

    sortProducts();
  }, [products, sortOrder]);

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

  return (
    <>
      <div className="w-full bg-white rounded-3xl lg:p-12 p-2 mt-8">
        <div className="flex lg:flex-row flex-col items-center justify-between sort-css">
          <div>
            <p className="text-[22px] font-bold">All Products</p>
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-8 main-search">
            <div className="w-[230px] relative p-2 flex flex-row bg-gray-500 rounded-lg items-center gap-8 ">
              <span className="mx-2 search-text">Search:</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products"
                className="ml-8 border-none outline-none bg-gray-500 search-input"
              />
            </div>

            <div className="w-[180px] relative p-2 flex flex-row bg-gray-500 rounded-lg items-center">
              <p className="text-sm w-[200px] search-text">Filter by Category:</p>
              <select
                onChange={(e) => setFilterTerm(e.target.value)}
                value={filterTerm}
                className="ml-2 border-none outline-none bg-gray-500  search-input selc-color"
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace(/-/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
           
            <div className="w-[180px] relative p-2 flex flex-row bg-gray-500 rounded-lg items-center">
              <p className="text-sm w-[200px] search-text">Sort by Price:</p>
              <select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className="ml-2 border-none outline-none search-input"
              >
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>

     
          <h1 className="text-[#16c098] font-bold ml-2 avail">Available Products</h1>
    
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-grid">
            {sortedProducts.map((data) => (
              <div key={data.id} className="shadow-md mb-4 pro-card">
                <div className="w-full h-[55%] rounded-t-lg flex items-center justify-center border rounded-lg">
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
                <p className="text-gray-600 text-2 px-4 mb-2">{data.description.slice(0, 35)}...</p>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
