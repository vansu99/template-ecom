import Link from 'next/link';

import { WEB_ROUTES } from '@/common/constants';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-[2rem] font-bold">Not Found</h2>
      <p className="text-[1.6rem]">Could not find requested resource</p>
      <Link href={WEB_ROUTES.HOME} className="text-[1.4rem]">
        Return Home
      </Link>
    </div>
  );
}
