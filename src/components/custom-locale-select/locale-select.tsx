'use client';

import { useTransition } from 'react';

import { Locale, locales } from '@/common/constants';
import { setAgentLocale } from '@/i18n/get-locale';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

export default function LocaleSelect() {
  const [isPending, startTransition] = useTransition();
  const defaultValue = useLocale();

  const onChange = (value: string) => {
    const locale = value as Locale;
    startTransition(() => {
      setAgentLocale(locale);
    });
  };

  return (
    <div className="relative">
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className={cn('w-[140px]', isPending && 'pointer-events-none')}>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {locales.map((lang) => (
            <SelectItem key={lang?.value} value={lang.value}>
              {lang?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
