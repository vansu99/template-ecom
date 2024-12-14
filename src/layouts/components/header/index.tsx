import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { WEB_ROUTES } from '@/common/constants';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const headerRoutes = [
  {
    name: 'Home',
    link: WEB_ROUTES.HOME,
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
];

function Header() {
  return (
    <nav
      id="header"
      className="bg-white border-b border-[#e8ebed] fixed top-0 left-0 right-0 z-20"
    >
      <div className="flex items-center h-full container justify-between">
        <Link
          href={WEB_ROUTES.HOME}
          className="inline-block w-[4.5rem] h-[4.5rem] flex-shrink-0"
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              fill
              sizes="100vw"
              priority
              src="/images/logo.png"
              alt="SAT"
              className="object-contain"
            />
          </AspectRatio>
        </Link>
        <div className="flex items-center lg:order-2"></div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            {headerRoutes.map((route, index) => (
              <li key={`${route.name}-${index}`}>
                <Link
                  href={route.link}
                  className="block py-2 pr-4 pl-3 text-black rounded lg:p-0 font-medium hover-underline"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
