'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

import { Input } from '../ui/input';

function ProductSearching() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = searchParams.get('q') || '';
  const [keyword, setKeyword] = useState(searchText);

  const handleSearchKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (keyword.length > 0) {
        router.push(`/?q=${encodeURIComponent(keyword)}`);
      } else {
        router.push('/');
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value;
    setKeyword(value);
  };

  return (
    <div className="mb-12 max-w-96 mx-auto">
      <Input
        placeholder="Searching..."
        onChange={handleChange}
        value={keyword}
        maxLength={100}
        onKeyDown={handleSearchKeyword}
        className="w-full h-14 text-[1.2rem]"
      />
    </div>
  );
}

export default ProductSearching;
