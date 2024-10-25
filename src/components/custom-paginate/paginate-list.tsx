/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

import { PAGE_SIZE_LIST } from '@/common/constants';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  queryParams?: any;
  route: string;
}

interface PaginationData {
  pages: number[];
  currentPage: number;
  totalPages: number;
}

const calculatePagination = (
  totalItems: number,
  currentPage: number,
  pageSize: number = PAGE_SIZE_LIST,
): PaginationData => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const normalizedPage = Math.max(1, Math.min(currentPage, totalPages));

  let startPage: number;
  let endPage: number;

  if (totalPages <= 4) {
    [startPage, endPage] = [1, totalPages];
  } else if (normalizedPage < 4) {
    [startPage, endPage] = [1, 4];
  } else if (normalizedPage + 3 >= totalPages) {
    [startPage, endPage] = [totalPages - 3, totalPages];
  } else {
    [startPage, endPage] = [normalizedPage - 2, normalizedPage + 2];
  }

  return {
    pages: Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    currentPage: normalizedPage,
    totalPages,
  };
};

const PaginationButton: React.FC<{
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ href, disabled, children, className }) => {
  const baseStyles =
    'w-14 h-14 flex justify-center items-center font-roboto text-[1.3rem]';
  const enabledStyles = 'hover:bg-primary';
  const disabledStyles = 'text-gray-400';

  if (disabled) {
    return (
      <span className={clsx(baseStyles, disabledStyles, className)}>{children}</span>
    );
  }

  return (
    <Link href={href} className={clsx(baseStyles, enabledStyles, className)}>
      {children}
    </Link>
  );
};

const CustomPaginate: React.FC<PaginationProps> = ({
  totalItems,
  queryParams,
  route,
}) => {
  const searchParams = useSearchParams();
  const page = Number(queryParams?.page);
  const { currentPage, pages, totalPages } = calculatePagination(totalItems, page);

  const createQueryLink = (targetPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', targetPage.toString());
    return `${route}?${newSearchParams}`;
  };

  return (
    <div className="flex border border-gray-200 max-w-min">
      <PaginationButton
        disabled={currentPage === 1}
        href={createQueryLink(1)}
        className="border-r border-gray-300 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === 1}
        href={createQueryLink(currentPage - 1)}
        className="border-r border-gray-300 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </PaginationButton>

      {pages.map((pageNum) => (
        <PaginationButton
          key={pageNum}
          href={createQueryLink(pageNum)}
          className={clsx(
            'border-r border-gray-300 last:border-r-0 ',
            pageNum === currentPage && 'bg-primary',
          )}
        >
          {pageNum}
        </PaginationButton>
      ))}

      <PaginationButton
        disabled={currentPage === totalPages}
        href={createQueryLink(currentPage + 1)}
        className="border-r border-gray-300 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === totalPages}
        href={createQueryLink(totalPages)}
        className=""
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
          />
        </svg>
      </PaginationButton>
    </div>
  );
};

export default CustomPaginate;
