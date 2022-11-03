import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductsFormPage from "./pages/ProductsFormPage";
import { UserContextProvider } from "./context/userContext";
import  ProtectedRoute  from "./app/ProtectedRoute";
import { isUserAdmin } from "./app/util";
import Layout from "./components/layout";
import { ProductContextProvider } from "./context/ProductContext";
import SingleProductPage from "./pages/SingleProductPage";
import { CartContextProvider } from "./context/cartContext";
import CartPage from "./pages/CartPage";

const App = () => {
  const isAdmin = isUserAdmin();
  return (
    <Router>
      <UserContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
        <Layout>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage></RegisterPage>} ></Route>
          <Route path="/profile/:name/" element={<ProfilePage></ProfilePage>} ></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
          <Route path="/products/categories/:categoryName" element={<></>} ></Route>
          <Route path="/products/categories/:categoryName/:productName" element={<SingleProductPage/>}></Route>
          <Route path="/products/new" element={  <ProtectedRoute hasAccess={true}> <ProductsFormPage /> </ProtectedRoute>}/>
          <Route path="/products/:id/edit" element={<ProtectedRoute hasAccess={true}> <ProductsFormPage /></ProtectedRoute>}/>
        </Routes>
        </Layout>
        </CartContextProvider>
        </ProductContextProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
