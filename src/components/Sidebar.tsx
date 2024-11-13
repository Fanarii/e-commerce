'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [isActive, setIsActive] = useState<string>("dashboard");

  const pathname = usePathname();

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <Link href="/dashboard" className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive === '/dashboard' ? 'bg-gray-700 rounded-2' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard/products" className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive === '/dashboard/products' ? 'bg-gray-700 rounded-2' : ''}`}>
            Products
          </Link>
        </li>
        <li>
          <Link href="/dashboard/brands" className={`block py-2 px-4 hover:bg-gray-700 rounded ${isActive === '/dashboard/brands' ? 'bg-gray-700 rounded' : ''}`}>
            Brands
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
