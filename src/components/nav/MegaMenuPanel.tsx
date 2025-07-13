'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Category = { label: string; href: string };
type Props = {
  data: {
    title: string;
    categories: Category[];
    images: string[];
  };
  isVisible: boolean;
};

const MegaMenuPanel: React.FC<Props> = ({ data, isVisible }) => {
  if (!isVisible) return null;

  return (
<div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-[25px] z-50
  w-[500px] max-w-[95vw] bg-white shadow-lg py-6 px-8 
  flex flex-col md:flex-row gap-6 border-t border-[#7b1f4b] rounded-[20px] overflow-visible"
>
      <div className="flex flex-col min-w-[90px]">
        <h3 className="font-bold text-[#7b1f4b] mb-2">{data.title}</h3>
        {data.categories.map((cat, i) => (
          <Link
            key={i}
            href={cat.href}
            className="text-sm py-1 text-gray-700 hover:text-[#7b1f4b] hover:underline transition"
          >
            {cat.label}
          </Link>
        ))}
      </div>

<div className="flex-1 relative h-44 rounded-lg overflow-hidden">
  <Image
    src={data.images[0]}
    alt="Mega Menu Image"
    fill
    className="object-cover"
  />
</div>




    </div>
  );
};

export default MegaMenuPanel;
