import { FC } from 'react';
import Image from 'next/image';

import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  quantity: number;
  handleQuantityChange: (productName:string, qty: number) => void;
}

const currencyFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'code',
});

const ProductCard: FC<ProductCardProps> = ({
  product,
  quantity,
  handleQuantityChange,
}) => (
  <div className="shadow border border-slate-300 rounded-lg justify-self-center">
    <Image
      className="rounded-lg select-none"
      src="/placeholder-image.webp"
      alt="imagen de referencia del producto"
      width={360}
      height={360}
    />

    <div className="p-4">
      <span>{currencyFormatter.format(product.unit_price)}</span>

      <p>{product.name}</p>

      {
        quantity === 0 ? (
          <button
            className={`border border-gray-600 px-3 py-1 rounded-2xl w-full mt-4 ${
              product.stock === 0 ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleQuantityChange(product.name, 1)}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
        ) : (
          <div className="flex justify-evenly items-center mt-4">
            <button
              className="border border-gray-600 px-3 py-1 rounded-2xl"
              onClick={() => handleQuantityChange(product.name, quantity - 1)}
            >
              -
            </button>

            <span className="select-none">{quantity}</span>

            <button
              className={`border border-gray-600 px-3 py-1 rounded-2xl ${
                quantity >= product.stock ? 'invisible' : ''
              }`}
              onClick={() => handleQuantityChange(product.name, quantity + 1)}
            >
              +
            </button>
          </div>
        )
      }
    </div>
  </div>
);

export default ProductCard;
