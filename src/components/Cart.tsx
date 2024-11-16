import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react"

// Tipe produk yang tersedia
interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
}

// Tipe untuk item dalam keranjang
interface CartItem {
  product: Product
  quantity: number
}

interface CartProps {
  btn: React.ReactNode
}

function Cart({ btn }: CartProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const totalPrice = cart.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogDescription>
            Manage the products in your cart here. You can remove items or proceed to checkout.
          </DialogDescription>
        </DialogHeader>
        {/* Menampilkan keranjang */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((cartItem) => (
                <div
                  key={cartItem.product.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-lg font-semibold">{cartItem.product.name}</p>
                      <p className="text-sm text-gray-500">x{cartItem.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">${(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(cartItem.product.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              {/* Total harga */}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => alert("Proceeding to checkout...")}>
            Proceed to Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Cart
