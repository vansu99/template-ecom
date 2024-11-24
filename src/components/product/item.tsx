import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { AspectRatio } from '../ui/aspect-ratio';

import type { ProductItem } from '@/types/product';

type Props = {
  item: ProductItem;
};

function ProductItem({ item }: Props) {
  const imgSrc =
    'https://images.pexels.com/photos/28936959/pexels-photo-28936959/free-photo-of-delicious-breakfast-with-croissants-and-cookies.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <Link
      href={`/${item?.slug}.${item?.id}`}
      className="flex flex-col h-full group bg-white overflow-hidden rounded-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative w-full text-center">
        <AspectRatio ratio={250 / 250} className="overflow-hidden">
          <Image
            fill
            src={imgSrc}
            alt={item?.name}
            sizes="100vw"
            className="h-full w-full object-center object-contain"
          />
        </AspectRatio>
      </div>
      <div className="py-6 px-6 h-full flex flex-col">
        <div className="flex flex-col flex-auto h-full">
          <p className="mb-1 font-roboto text-[1.3rem]">{item?.code}</p>
          <h4 className="line-clamp-2 text-ellipsis group-hover:underline text-[1.3rem]">
            {item?.name}
          </h4>
        </div>
        <div className="flex-1 flex flex-col"></div>
      </div>
    </Link>
  );
}

export default ProductItem;
