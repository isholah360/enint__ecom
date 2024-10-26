'use client'

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/router'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login')
    } else {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      })
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
