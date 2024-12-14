import React, { Fragment } from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  links: {
    name: string;
    link: string;
    className?: string;
    callback?: () => void;
  }[];
};

function CustomBreadcrumb({ links }: Props) {
  const lastLink = links.at(-1)?.name;

  return (
    <div className="flex items-center min-w-0 overflow-ellipsis overflow-hidden whitespace-nowrap">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 text-black"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m8.36 1.37 6.36 5.8-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71 6.35-5.8zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43z"
        />
      </svg>
      <Breadcrumb>
        <BreadcrumbList>
          {links.map((item, index) => (
            <Fragment key={`item_${item.name}_${index}`}>
              <BreadcrumbItem>
                {lastLink === item?.name ? (
                  <span
                    className={clsx(
                      'text-[1rem] leading-[1.2rem] font-noto font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis',
                      item?.className,
                    )}
                  >
                    {item?.name!}
                  </span>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className="text-[1rem] font-noto leading-[1.3rem] text-ellipsis whitespace-nowrap text-black hover:text-black overflow-hidden"
                  >
                    <Link href={item?.link!} onClick={item?.callback || undefined}>
                      {item?.name!}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {links.length > 1 ? (
                <BreadcrumbSeparator className="last:hidden">
                  <span className="text-[1rem]">/</span>
                </BreadcrumbSeparator>
              ) : null}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default CustomBreadcrumb;
