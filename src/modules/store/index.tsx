import { useReducer } from 'react';

import Cart from '@/features/cart';
import ProductCard from './components/ProductCard';
import { products } from './data/products.json';

const cartReducer = (
  state: Record<string, number>,
  action: {productName?: string, quantity?: number},
) => (action.productName ? ({
  ...state,
  [action.productName]: action.quantity ?? 0,
}) : {});

const Store = () => {
  const [rawCart, dispatch] = useReducer(cartReducer, {});

  const handleQuantityChange = (productName: string, quantity: number) => {
    dispatch({
      productName,
      quantity,
    });
  };

  const handleCreateOrder = () => {
    alert('Order created');
    dispatch({});
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 mt-12">
      <div className="grid grid-cols-2 gap-4 px-6">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            product={product}
            quantity={rawCart[product.name] ?? 0}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <Cart rawCart={rawCart} createOrder={handleCreateOrder} />
    </div>
  );
};

export default Store;
