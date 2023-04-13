import { useContext, lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/context/app.context';
import MainLayout from 'src/layouts/MainLayout';
import RegisterLayout from 'src/layouts/RegisterLayout';
import CartLayout from 'src/layouts/CartLayout';
import UserLayout from 'src/pages/User/layout/UserLayout';

const Login = lazy(() => import('src/pages/Login'));
const ProductList = lazy(() => import('src/pages/ProductList'));
const Profile = lazy(() => import('src/pages/User/page/Profile'));
const Register = lazy(() => import('src/pages/Register'));
const ProductDetail = lazy(() => import('src/pages/ProductDetail'));
const Cart = lazy(() => import('src/pages/Cart'));
const ChangePassword = lazy(() => import('src/pages/User/page/ChangePassword'));
const HistoryPurchase = lazy(() => import('src/pages/User/page/HistoryPurchase'));
const PageNotFound = lazy(() => import('src/pages/PageNotFound'));

export default function useRouteElement() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext);
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
  }

  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <PageNotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ]);
  return routeElements;
}
