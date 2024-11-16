"use client"
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/interfaces';
import { formatRupiah, getProductById } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

const initialProductState: Product = {
	id: 0,
	name: '',
	description: '',
	price: 0,
	sku: '',
	stockQuantity: 0,
	imageUrl: '',
	category: { id: 0, name: '' },
	brand: {
		id: 1,
		name: "Brand Name",
		products: [],
		createdAt: new Date('2024-01-01T00:00:00Z')
	},
	variations: [],
	reviews: [],
};


const page = (props: { params: Promise<{ id: string }> }) => {
	const params = use(props.params);
	const [product, setProduct] = useState<Product>(initialProductState)
	useEffect(() => {
		const fetchData = async () => {
			const product = await getProductById(Number(params.id))
			setProduct(product)
		}

		fetchData()
	}, [])

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{/* Product Image */}
			<div className="flex justify-center">
				{product.imageUrl ? (
					<Image
						src={product.imageUrl}
						alt={product.name}
						width={500}
						height={500}
						className="rounded-lg shadow-md"
					/>
				) : (
					<div className="bg-gray-200 w-full h-96 rounded-lg"></div>
				)}
			</div>

			{/* Product Info */}
			<div className="space-y-4">
				<h1 className="text-3xl font-semibold">{product.name}</h1>
				<p className="text-gray-500">{product.category.name}</p>
				<p className="text-gray-600">{product.brand.name}</p>

				<p className="text-lg">{product.description || 'Deskripsi produk tidak tersedia.'}</p>

				<div className="flex items-center space-x-4">
					<p className="text-xl font-semibold text-green-600">
						{formatRupiah(product.price)}
					</p>
					<p className="text-sm text-gray-500">Stok: {product.stockQuantity} unit</p>
				</div>

				{/* Variations (e.g. color, size) */}
				{product.variations && product.variations.length > 0 && (
					<div className="mt-6">
						<h3 className="font-semibold text-lg">Variasi Produk</h3>
						<ul className="space-y-2">
							{product.variations.map((variation) => (
								<li key={variation.id} className="text-gray-600">
									{variation.name}: {variation.value}
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Product Reviews */}
				<div className="mt-6">
					<h3 className="font-semibold text-lg">Ulasan Produk</h3>
					{/* {product.reviews.length > 0 ? (
							<ul className="space-y-4">
								{product.reviews.map((review) => (
									<li key={review.id} className="p-4 border border-gray-200 rounded-lg">
										<div className="flex justify-between">
											<p className="font-semibold">{review.username}</p>
											<p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
										</div>
										<p className="text-gray-600 mt-2">{review.comment}</p>
									</li>
								))}
							</ul>
						) : ( */}
					<p className="text-gray-500">Belum ada ulasan.</p>
					{/* )} */}
				</div>
				<div className='mt-6 flex'>
					<Button><FiShoppingCart /> Add to cart</Button>
				</div>
				<div className='mt-6'>
					<Link href={'/'}><Button variant={'secondary'}><FiArrowLeft /> Back</Button></Link>
				</div>
			</div>
		</div>
	);
};

export default page