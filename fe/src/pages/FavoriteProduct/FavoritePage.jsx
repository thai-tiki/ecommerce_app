import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions as a } from "../../actions/productActions";
import { constants as c } from "../../constants";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import PageLoading from "../../components/PageLoading";
function FavoritePage(props) {
  const pageInfo = useSelector(state => state.product.favorite);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Sản phẩm yêu thích"
    if (pageInfo.status === c.LOADING) {
      dispatch(a.getFavoriteProducts());
    }
  }, []);
  return (
    pageInfo.status === c.SUCCESS
      ?
      <React.Fragment>
        <Header />
        <div className="purchased-product-page container">
          <div className="mobile-tool mobile">
            <span>
              Có {pageInfo.data.length} sản phẩm yêu thích
            </span>
          </div>
          <div className="products-list">
            <span>
              Có {pageInfo.data.length} sản phẩm yêu thích
            </span>
            <div className="row">
              {
                pageInfo.data.map((v, i) =>
                  <ProductCard
                    key={i}
                    product={v}
                  />
                )
              }
            </div>
          </div>
        </div>
      </React.Fragment>
      : <PageLoading />
  )
}
export default FavoritePage