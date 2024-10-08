import React from "react";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/products" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/products',
    element: <PrivateRoute element={<Products />} />,
  },
  {
    path: '/products/create',
    element: <PrivateRoute element={<CreateProduct />} />,
  },
  {
    path: '/products/:id',
    element: <PrivateRoute element={<ProductDetails />} />,
  },
  {
    path: '/users',
    element: <PrivateRoute element={<Users />} />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
