const WEB_ROUTES = {
  HOME: '/',
  NOTFOUND: '/404',
  LOGIN: '/login',
  MAINTENANCE: '/maintenance',
  PROFILE: {
    SETTINGS: '/profile/settings',
  },
};

const publicRoutes: string[] = [
  WEB_ROUTES.HOME,
  WEB_ROUTES.LOGIN,
  WEB_ROUTES.NOTFOUND,
  WEB_ROUTES.MAINTENANCE,
];

const protectedRoutes: string[] = [WEB_ROUTES.PROFILE.SETTINGS];

export { WEB_ROUTES, publicRoutes, protectedRoutes };
