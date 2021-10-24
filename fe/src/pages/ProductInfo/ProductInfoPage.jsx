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
  const productLiked = useSelector(state => state.product.info.is_favorite);
  const similarProducts = useSelector(state => state.product.similar);
  const reviews = useSelector(state => state.product.review);
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
      if (reviews.status === c.LOADING)
        dispatch(a.getProductReview(productId));
      if (productId !== product._id) {
        dispatch({ type: c.RESET_PRODUCT_STATUS });
        return;
      }
      document.title = product.name;
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
                product={product}
                isLiked={productLiked}
              />
              <DetailInfo
                description={product.description}
                attributes={product.attributes}
              />
              <SimilarProducts
                products={[]}
              />
            </div>
          </React.Fragment>
      }
    </React.Fragment>
  )
}
export default ProductInfoPage