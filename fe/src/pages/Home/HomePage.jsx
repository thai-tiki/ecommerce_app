import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeBanner from "./child/HomeBanner";
import Header from "../../components/Header";
import { constants as c } from "../../constants";
import ProductSection from "./child/ProductSection";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
function HomePage(props) {
  const dispatch = useDispatch();
  const homeInfo = useSelector(state => state.app.home);
  useEffect(() => {
    document.title = "Magento - Mua sắm online không giới hạn";
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (homeInfo.status === c.LOADING)
      dispatch(appActions.getHomeInfo());
    else console.log(homeInfo)
  });
  return (
    <React.Fragment>
      <Header />
      <div className="home-page container">
        {
          homeInfo.status === c.LOADING ? <PageLoading /> :
            <React.Fragment>
              <HomeBanner
                banners={homeInfo.banners}
                categories={homeInfo.categories}
              />
              {
                homeInfo.hot_products.length > 0 &&
                <ProductSection title="Sản phẩm nổi bật" products={homeInfo.hot_products} />
              }
              {
                homeInfo.new_products.length > 0 &&
                <ProductSection title="Sản phẩm mới" products={homeInfo.new_products} />
              }
            </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}
export default HomePage