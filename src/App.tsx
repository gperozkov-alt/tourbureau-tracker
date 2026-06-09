import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Toaster } from '@blinkdotnew/ui';
import HomePage from './pages/HomePage';
import TourDetailsPage from './pages/TourDetailsPage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const tourRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tour/$id',
  component: TourDetailsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, tourRoute]);
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
