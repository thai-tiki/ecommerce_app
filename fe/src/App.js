import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Popup from "./components/Popup/Popup";
import CartPage from "./pages/Cart/CartPage";
import HomePage from "./pages/Home/HomePage";
import NewsPage from "./pages/News/NewsPage";
import ErrorPage from "./pages/Error/ErrorPage";
import ReviewPage from "./pages/Review/ReviewPage";
import AddressPage from "./pages/Address/AddressPage";
import VoucherPage from "./pages/Voucher/VoucherPage";
import AccountPage from "./pages/Account/AccountPage";
import OrderInfoPage from "./pages/OrderInfo/OrderInfo";
import NewsListPage from "./pages/NewsList/NewsListPage";
import OrdersListPage from "./pages/OrderList/OrdersListPage";
import FavoritePage from "./pages/FavoriteProduct/FavoritePage";
import ProductInfoPage from "./pages/ProductInfo/ProductInfoPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductsListPage from "./pages/ProductsList/ProductsListPage";
import { categoryActions } from "./actions/categoryActions";
import { AdminPage } from "./pages/Admin";
import { constants as c } from "./constants";
import { appActions } from "./actions/appActions";
import PurchasedPage from "./pages/PurchasedProduct/PurchasedPage";
function App() {
  const dispatch = useDispatch();
  const categoryStatus = useSelector((state) => state.category.status);
  const appTheme = useSelector((state) => state.app.appTheme);
  const infoStore = useSelector((state) => state.app.infoStore);
  useEffect(() => {
    if (categoryStatus === c.LOADING) {
      dispatch(categoryActions.getCategories());
    }
    if (appTheme.status === c.NONE) {
      dispatch(appActions.getWebTheme());
    }
    if (infoStore.status === c.NONE) {
      dispatch(appActions.getInfoStore());
    }
  }, []);
  return categoryStatus === c.SUCCESS ? (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/danh-sach-san-pham" component={ProductsListPage} />
          <Route path="/danh-gia-cua-toi" component={ReviewPage} />
          <Route path="/yeu-thich" component={FavoritePage} />
          <Route path="/san-pham-da-mua" component={PurchasedPage} />
          <Route path="/san-pham/:id" component={ProductInfoPage} />
          <Route path="/gio-hang" component={CartPage} />
          <Route path="/tin-tuc/:id" component={NewsPage} />
          <Route path="/tin-tuc" component={NewsListPage} />
          <Route path="/dia-chi" component={AddressPage} />
          <Route path="/tai-khoan" component={AccountPage} />
          <Route path="/danh-muc" component={CategoriesPage} />
          <Route path="/don-hang/:id" component={OrderInfoPage} />
          <Route path="/don-hang" component={OrdersListPage} />
          <Route path="/ma-giam-gia" component={VoucherPage} />
          <Route path="/quan-ly" component={AdminPage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
        <Popup />
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  ) : (
    categoryStatus === c.FAILURE && <ErrorPage location="/" />
  );
}

export default App;
