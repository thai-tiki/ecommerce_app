import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainInfo from "./child/MainInfo";
import DetailInfo from "./child/DetailInfo";
import Header from "../../components/Header";
import SimilarProducts from "./child/SimilarProducts";
import PageLoading from "../../components/PageLoading";
import { constants as c } from "../../constants";
import { productActions as a } from "../../actions/productActions";
function ProductInfoPage(props) {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.info);
  const similarProducts = useSelector(state => state.product.similar);
  const rating = useSelector(state => state.product.rating);
  useEffect(() => {
    let productId = "";
    if (props.match.params.id) {
      let arr = props.match.params.id.split("-");
      productId = arr[arr.length - 1];
    }
    if (product.status === c.LOADING) {
      dispatch(a.getProductInfo(productId));
    }
    if (product.status === c.SUCCESS) {
      if (similarProducts.status === c.LOADING)
        dispatch(a.getSimilarProducts(productId));
      if (rating.status === c.LOADING)
        dispatch(a.getProductReview(productId));
      if (productId !== product.data._id) {
        dispatch({ type: c.RESET_PRODUCT_STATUS });
        return;
      }
      document.title = product.data.name;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [product])
  return (
    <React.Fragment>
      <Header />
      {
        product.status === c.LOADING ? <PageLoading />
          :
          <React.Fragment>
            <div className="product-info-page container">
              <MainInfo
                product={product.data}
                isLiked={product.data.isLiked}
              />
              <DetailInfo
                description={product.data.description}
                attributes={product.data.attributes}
              />
              <SimilarProducts
                products={similarProducts.list}
              />
            </div>
          </React.Fragment>
      }
    </React.Fragment>
  )
}
export default ProductInfoPage