import { WEB_ROUTES } from '@/common/constants';
import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#eee] overflow-hidden">
      <div className="container py-8 lg:pt-12 lg:pb-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href={WEB_ROUTES.HOME} className="flex items-center flex-shrink-0">
              <img src="/images/logo.png" className="h-[4.5rem]" alt="SAT" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-[1.4rem] font-semibold text-black uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://flowbite.com/"
                    className="hover-underline inline-block"
                  >
                    Flowbite
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover-underline inline-block"
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-[1.4rem] font-semibold text-black uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover-underline inline-block "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover-underline inline-block"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-[1.4rem] font-semibold text-black uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover-underline inline-block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover-underline inline-block">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="text-[1.2rem] text-black sm:text-center dark:text-gray-400">
            © 2024{' '}
            <a href={WEB_ROUTES.HOME} className="hover-underline inline-block">
              SAT
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
