import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "components/navigation/header";
import Footer from "components/navigation/footer";
import Home from "components/home";
import MainLayout from "./hoc/mainLayout";
import RegisterLogin from "components/auth";
import Loader from "utils/loader";
import { userIsAuth, userSignOut } from "store/actions/user-actions";
import Dashboard from "./components/dashboard";
import UserInfo from "components/dashboard/user/info";
import AuthGuard from "./hoc/authGuard";
import AdminProducts from "./components/dashboard/admin/products";
import AddProduct from './components/dashboard/admin/products/addEdit/add';
import EditProduct from './components/dashboard/admin/products/addEdit/edit'
import Shop from './components/shop';
import ProductDetail from './components/product';

const Routes = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if(users.auth !== null) {
      setLoading(false)
    }
  }, [users]);

  return (
    <BrowserRouter>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header 
            users={users}
            signOutUser={signOutUser}
          />
          <MainLayout>
            <Switch>
              <Route path="/dashboard/admin/edit_product/:id" component={AuthGuard(EditProduct)} />
              <Route path="/dashboard/admin/add_product" component={AuthGuard(AddProduct)} />
              <Route path="/dashboard/admin/admin_products" component={AuthGuard(AdminProducts)} />
              <Route path="/dashboard/user/user_info" component={AuthGuard(UserInfo)} />
              <Route path="/dashboard" component={AuthGuard(Dashboard)} />
              <Route path="/product_detail/:id" component={ProductDetail} />
              <Route path="/shop" component={Shop} />
              <Route path="/sign_in" component={RegisterLogin} />
              <Route path="/" component={Home} />
            </Switch>
          </MainLayout>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default Routes;
