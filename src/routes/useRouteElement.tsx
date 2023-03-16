import { useRoutes } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import RegisterLayout from 'src/layouts/RegisterLayout';

import Login from 'src/pages/Login';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    }
  ]);
  return routeElements;
}
