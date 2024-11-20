'use client'

import { useState } from "react"
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi" // Ikon dari react-icons
import Cart from "./Cart"
import Link from "next/link"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold cursor-pointer"><Link href='/'>Logo</Link></div>

        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="py-2 px-4 pl-10 bg-gray-700 text-white rounded-full focus:outline-none"
            placeholder="Search..."
          />
          <FiSearch className="absolute left-3 text-gray-400" />
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-lg">
            <FiUser />
          </button>

          <button className="text-lg">
            <FiHeart />
          </button>

          <button className="text-lg">
            <Cart btn={<FiShoppingCart/>} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
