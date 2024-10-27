import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import envConfig from './common/constants/config';
import { protectedRoutes, WEB_ROUTES } from './common/constants';

export async function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const maintenanceMode = envConfig.NEXT_PUBLIC_MAINTENANCE_MODE === 'on';

  if (
    maintenanceMode &&
    !request.nextUrl.pathname.startsWith(WEB_ROUTES.MAINTENANCE) &&
    !isAdminPath &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    return NextResponse.redirect(WEB_ROUTES.MAINTENANCE);
  }

  // if path is public route than do nothing
  /**
   * TODO:
   * 1. get token
   * 2. checking if path name starts from /auth, and session is there redirect to dashboard
   * 3. checking if path name does not start from /auth, and session is not there redirect to login
   * 4. checking if path name start from admin, and session role is not admin or super admin redirect to dashboard
   * Tham khảo: https://github.com/alifarooq9/rapidlaunch/blob/main/starterkits/saas/src/middleware.ts
   */
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // get token
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
