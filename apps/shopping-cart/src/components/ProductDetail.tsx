import { useState, useEffect } from 'react';
import { IProduct } from '../interfaces/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductAvailability from './ProductAvailability';
import ProductPrice from './ProductPrice';
import Counter from './Counter';
import AddToCartButton from './AddToCartButton';
import Message from './Message';
import { useQuery } from '@tanstack/react-query';

interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [availability, setAvailability] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [error, setError] = useState(false);

  // check availability API call
  const fetchAvailability = async () => {
    const response = await fetch(`/api/check-availability`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // get data from /check-availability response
  const { data } = useQuery({
    queryKey: ['availability'],
    queryFn: fetchAvailability,
  });

  // update quantity and availability
  useEffect(() => {
    if (data) {
      setAvailability(data.available);
      setQuantity(data.qty);
    }
  }, [data]);

  // add to cart
  const addToCart = async () => {
    const response = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qty: quantity,
      }),
    });

    setMessageVisibility(true);

    if (response.ok) {
      setError(false);
      setMessage('Product added to cart!');
    } else {
      setError(true);
      const res = await response.json();
      setMessage(res.message);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      <ProductImage src={product.photo} alt={product.name} />
      <div className="grid content-center">
        <ProductInfo name={product.name} description={product.description} />
        <ProductAvailability available={availability} />
        <ProductPrice price={product.price} />
        <Counter quantity={quantity} setQuantity={setQuantity} />
        <AddToCartButton onClick={addToCart} />
        <Message visibility={messageVisibility} error={error} message={message} />
      </div>
    </div>
  );
};

export default ProductDetail;
