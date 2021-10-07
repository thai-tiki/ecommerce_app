import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import Header from "../../components/Header";
import { userActions as a } from "../../actions/userActions";
import PageLoading from "../../components/PageLoading";
import ReviewCard from "./child/ReviewCard";
function ReviewPage() {
  const dispatch = useDispatch();
  const pageInfo = useSelector(state => state.user.myReview);
  useEffect(() => {
    document.title = "Đánh giá của tôi";
    console.log(pageInfo);
    if (pageInfo.status === c.LOADING) {
      dispatch(a.getUserReview());
    }
  })
  return (
    <React.Fragment>
      <Header />
      {
        pageInfo.status === c.LOADING ? <PageLoading /> :
          <div className="review-page">
            <div className="container">
              <h4>Sản phẩm đã đánh giá</h4>
              {
                pageInfo.list.map((v, i) =>
                  <ReviewCard
                    key={i}
                    name={v.product.name}
                    images={v.product.images}
                    stars={v.stars}
                    content={v.content}
                    id={v.product.id}
                  />
                )
              }
            </div>
          </div>
      }
    </React.Fragment>
  )
}
export default ReviewPage