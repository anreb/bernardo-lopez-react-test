import React, { useEffect, useState } from "react";
import { Navigate, Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CreateProduct from "./pages/CreateProduct";
import Users from "./pages/Users";
import PrivateRoute from "./components/PrivateRoute";
import "./App.scss"
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (JSON.parse(String(localStorage.getItem('loginData')))) {
      setUserData(true);
    }
  }, [userData]);

  const logout = () => {
    localStorage.removeItem('loginData')
    setUserData(false);
  }

  if (!userData) {
    return (
      <>
        <nav className="navigationContainer">
          <ul className="navigationList">
            <li className="navigationItem"><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <Outlet context={{ setUserData }} />
      </>
    );
  }

  return (
    <>
      <nav className="navigationContainer">
        <ul className="navigationList">
          <li className="navigationItem"><Link to="/products">Products</Link></li>
          <li className="navigationItem"><Link to="/products/create">Create Product</Link></li>
          <li className="navigationItem"><Link to="/users">Users</Link></li>
          <li className="navigationItem" onClick={logout}><Link to="/login">Logout</Link></li>
        </ul>
      </nav>
      <Outlet context={{ setUserData }} />
    </>
  );
};

const LoginWrapper: React.FC = () => {
  const userData = localStorage.getItem('loginData');

  if (userData) {
    return <Navigate to="/products" />;
  }

  return <Login edit={false} />;
};

const router = createHashRouter([
  {

    path: '/',
    element: <Navigation />,
    children: [
      {
        path: '/login',
        element: <LoginWrapper />,
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
    ]
  }
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
