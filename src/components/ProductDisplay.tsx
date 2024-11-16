"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getProducts, formatRupiah } from '@/lib/utils';
import { Product } from '@/lib/interfaces';
import Link from 'next/link';


const ProductDisplay = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProducts()
      setProducts(products)
    }

    fetchProduct()
  }, [])
  return (
    <div className='grid grid-cols-5 gap-4 p-6'>
      {products.map((product) => (
        <Card key={product.id} className="w-full">
          <CardContent className="flex flex-col items-center">
            {/* <img
              src="https://via.placeholder.com/200"
              alt="Product Name"
              className="w-32 h-32 object-cover mb-4"
            /> */}

            <h3 className="text-lg font-semibold text-center mt-3">{product.name}</h3>

            <p className="text-xl font-bold text-center mt-4">{formatRupiah(product.price)}</p>
          </CardContent>

          <CardFooter className='flex justify-center'>
            <Link href={`/products/${product.id}`} >
              <Button className="w-full flex justify-center items-center">
                View Detail
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductDisplay;
