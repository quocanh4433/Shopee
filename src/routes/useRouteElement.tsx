import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/context/app.context';
import MainLayout from 'src/layouts/MainLayout';
import RegisterLayout from 'src/layouts/RegisterLayout';
import CartLayout from 'src/layouts/CartLayout';
import Cart from 'src/pages/Cart';

import Login from 'src/pages/Login';
import ProductDetail from 'src/pages/ProductDetail';
import ProductList from 'src/pages/ProductList';
import Profile from 'src/pages/Profile';
import Register from 'src/pages/Register';

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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
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
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ]);
  return routeElements;
}
