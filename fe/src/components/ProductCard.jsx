import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { formatPrice, handleImgErr, standardProductLink } from "../helper";
import { productActions } from "../actions/productActions";
import { constants } from "../constants";
export default function ProductCard(props) {
  const myLink = useRef(null);
  const dispatch = useDispatch();
  let { before_discount_price, after_discount_price, images, name, _id } = props.product;
  let avt = "/img/default_product.jpg";
  let discountPercent = Math.ceil(
    (before_discount_price - after_discount_price)
    / before_discount_price
    * 100);
  if (images.length)
    avt = images[0];
  function handleClick() {
    dispatch({ type: constants.RESET_PRODUCT_STATUS })
    myLink.current.click();
  }
  return (
    <div onClick={handleClick} className="product-card">
      <div style={{ display: "none" }}>
        <Link ref={myLink} to={`/san-pham/${standardProductLink(name)}-${_id}`} />
      </div>
      <div className="image">
        <div className="img-container">
          <img src={avt} alt="" loading="lazy"
            onError={handleImgErr}
            style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>
        <div className="name">
          {name}
        </div>
        <div className="row">
          <div className="current-price">
            {formatPrice(after_discount_price)} ₫
          </div>
          {
            discountPercent > 0 &&
            <div className="discount">-{discountPercent}%</div>
          }
        </div>
      </div>
    </div>
  )
}