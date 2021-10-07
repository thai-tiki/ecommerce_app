import React from "react";
import { constants as c } from "../../../constants";
export default function ReviewCard(props) {
  let { id, name, images, stars, content } = props;
  images = images && images.length > 0 ? images : [{ image_url: c.DEFAULT_PRODUCT_IMG }]
  return (
    <React.Fragment>
      <div className="review-card">
        <div className="row">
          <div className="image">
            <div className="img-container">
              <img src={images[0].image_url} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
            </div>
          </div>
          <div className="info">
            <div className="name">
              {name}
            </div>
            <div className="stars">
              <span>Đánh giá: </span> {stars} <i className="fas fa-star"></i>
            </div>
            <div>
              <a href={`/san-pham/${id}`}>Thông tin sản phẩm</a>
            </div>
          </div>
          <textarea disabled placeholder="Không có nội dung đánh giá" value={content ? content : ""}></textarea>
        </div>
        <textarea className="mobile" disabled placeholder="Không có nội dung đánh giá" value={content ? content : ""}></textarea>
      </div>
    </React.Fragment>
  )
}