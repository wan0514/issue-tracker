import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import IssueListPage from '@/pages/IssueListPage';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';

//lazy loading
const IssueDetailPage = lazy(() => import('@/pages/IssueDetailPage'));
const NewIssuePage = lazy(() => import('@/pages/NewIssuePage'));
const LabelsPage = lazy(() => import('@/pages/LabelsPage'));
const MilestonesPage = lazy(() => import('@/pages/MilestonesPage'));
const NotFoundPage = lazy(() => import('@/pages/NofoundPage'));
const AuthCallbackPage = lazy(() => import('@/pages/AuthCallbackPage'));

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/auth/callback',
    element: withSuspense(AuthCallbackPage),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <IssueListPage /> },
      {
        path: 'issues/:id',
        element: withSuspense(IssueDetailPage),
      },
      {
        path: 'issues/new',
        element: withSuspense(NewIssuePage),
      },
      {
        path: 'labels',
        element: withSuspense(LabelsPage),
      },
      {
        path: 'milestones',
        element: withSuspense(MilestonesPage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
