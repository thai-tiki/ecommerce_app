import { formatPrice, handleImgErr } from "../helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {standardProductLink} from "../helper"
export default function ProductCard(props) {
 
  const appTheme = useSelector(state => state.app.appTheme);
  const profile = useSelector(state => state.user.profile);
  const myLink = useRef(null);
  let {min_price, price, product_discount, percent_collaborator, images, name, id } = props.product;
  let pastPrice = min_price;
  let discount = 0;
  let discount_percent = 0;
  let avt = "/img/default_product.jpg";
  if (product_discount) {
    discount_percent = product_discount.value;
    discount =  min_price * 0.01 *  product_discount.value;
    price = min_price - discount;
  }
  if (images.length)
    avt = images[0].image_url;
  function handleClick() {
    myLink.current.click();
  }
  return (
    <div onClick={handleClick} className="product-card">
      <div style={{ display: "none" }}>
        <Link ref={myLink} to={`/san-pham/${ standardProductLink(name) }-${id}`} />
      </div>
      <div className="image">
        <div className="img-container">
          <img src={avt} alt="" loading="lazy"
            onError={handleImgErr}
            style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
          {
            profile.is_collaborator &&
            <label style={{ background: appTheme.color_main_1 }}>
              {`Hoa hồng: ${formatPrice(min_price * percent_collaborator / 100)}`}
            </label>
          }
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>
        <div className="name">
          {name}
        </div>
        <div className="current-price" style={{ color: appTheme.color_main_1 }}>
          ₫{formatPrice(price)}
        </div>
        {
          <div className="row" style={{ height: "15px" }}>
            <div className="past-price">
              {
                product_discount &&
                `₫${formatPrice(pastPrice)}`
              }
            </div>
            <div className="discount">
              {
                product_discount &&
                `-${discount_percent}%`
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}