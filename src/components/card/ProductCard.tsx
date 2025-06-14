import React from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  image: string;
  price: number;
};

const ProductCard: React.FC<Props> = ({ title, image, price }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm w-[200px]">
      <Image src={image} alt={title} width={200} height={200} className="rounded-md object-cover" />
      <h4 className="mt-2 font-semibold text-sm">{title}</h4>
      <p className="text-[#7b1f4b] font-medium text-sm mt-1">${price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
