"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { IoMdCart } from "react-icons/io";
import CartModal from "./CartModal";
import "./nav.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
    <nav className="bg-grey-500 text-white p-4 main-nav">
      <div className="container mx-auto flex justify-between items-center gap-8 navy">
        <Link href="/" className="text-xl font-bold">
          MyShop
        </Link>
        <div className="space-x-4 flex items-center justify-center gap-6">
          <div className="text-2xl relative c-icons" onClick={toggleModal}>
            <div className="icon-out">
              {totalItemsInCart > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1 cart-numb">
                  {totalItemsInCart}
                </span>
              )}
              <IoMdCart />
            </div>
          </div>
          <Link href="/product">Products</Link>
          {user ? (
            <>
                <Link href="/"><button onClick={logout}>Logout</button></Link>
              
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
     <CartModal isOpen={isModalOpen} onClose={toggleModal} /> </>
  );
};

export default Navbar;
