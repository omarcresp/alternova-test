import { useEffect, useState } from 'react';

import { products } from '@/modules/store/data/products.json';
import { Product } from '@/types/product';

interface ProductCart extends Product {
  quantity: number;
  total: number;
}

const useCart = (rawCart: Record<string, number>) => {
  const [cart, setCart] = useState<ProductCart[]>([]);

  useEffect(() => {
    const cartItems = Object.entries(rawCart).map(([name, quantity]) => {
      const product = products.find((p) => p.name === name)!;

      return {
        ...product,
        quantity,
        total: product.unit_price * quantity,
      };
    }).filter((p) => p.quantity > 0 && p.name);

    setCart(cartItems);
  }, [rawCart]);

  const total = cart.reduce((acc, p) => acc + p.total, 0);

  return { cart, total };
};

export default useCart;
