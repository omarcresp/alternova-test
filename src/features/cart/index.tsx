import { FC } from 'react';

import useCart from './hooks/useCart';

interface CartProps {
  rawCart: Record<string, number>;
  createOrder: () => void;
}

const currencyFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
});

const Cart: FC<CartProps> = ({ rawCart, createOrder }) => {
  const { cart, total } = useCart(rawCart);

  const handleCreateOrder = () => {
    const cartJSON = {
      products: cart,
      total,
    };

    console.log(cartJSON);

    createOrder();
  };

  return (
    <div
      className="py-2 px-4 border-2 border-gray-200 bg-slate-50 rounded-lg fixed flex justify-between flex-col"
      style={{ left: 'calc(50vw + 1rem)', width: '45vw', height: '88vh' }}
    >
      <div>
        <h3 className="font-light text-4xl">
          Cart
        </h3>

        {cart.length > 0 && (
          <div
            className="grid gap-2 font-bold mt-6"
            style={{ gridTemplateColumns: '1fr 5rem 4rem 5rem' }}
          >
            <span>Product Name</span>
            <span>Unit Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
        )}

        {cart.map((item) => (
          <div
            className="grid gap-2 mt-1"
            key={item.name}
            style={{ gridTemplateColumns: '1fr 5rem 4rem 5rem' }}
          >
            <span>{item.name}</span>
            <span>{currencyFormatter.format(item.unit_price)}</span>
            <span>{item.quantity}</span>
            <span>{currencyFormatter.format(item.total)}</span>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mb-3 flex justify-between items-center">
          <span>Total: {currencyFormatter.format(total)}</span>

          <button
            className="border border-gray-600 px-3 py-1 rounded-2xl"
            onClick={handleCreateOrder}
          >
            Create order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
