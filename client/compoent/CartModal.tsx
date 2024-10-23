"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import "./nav.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart } = useCart();

  if (!isOpen) return null;

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-pg">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Cart Details</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2 cart_img-de">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover modal-image"
              />
              <div className="flex-1 mx-2">
                <p>{item.title}</p>
                <div className="quan-price">
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between price-close">
          <div className="flex justify-between font-bold ">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
