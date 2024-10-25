import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import type { ProductSort } from '@/types/product';

type Props = {
  sort: ProductSort | undefined;
  onUpdateSort: (value: string) => void;
};

function ProductSorter({ sort, onUpdateSort }: Props) {
  return (
    <Select value={sort || 'code_ascending'} onValueChange={onUpdateSort}>
      <SelectTrigger className="w-fit gap-2 text-start">
        <span>
          Sort by: <SelectValue />{' '}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="code_ascending">Code</SelectItem>
        <SelectItem value="price_ascending">Price (Low to hight)</SelectItem>
        <SelectItem value="price_descending">Price (Hight to low)</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default ProductSorter;
