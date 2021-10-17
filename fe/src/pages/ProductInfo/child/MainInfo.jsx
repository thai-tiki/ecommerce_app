import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import { constants as c } from "../../../constants";
import { cartActions } from "../../../actions/cartActions";
import { userActions } from "../../../actions/userActions";
import { productActions } from "../../../actions/productActions";
import { voucherActions } from "../../../actions/voucherActions";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MainInfo(props) {
  let {
    _id,
    name,
    images,
    quantity,
    after_discount_price,
    before_discount_price,
  } = props.product;
  if (!images.length) images.push({ image_url: "/img/default_product.jpg" });
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.voucher.list);
  const appTheme = useSelector((state) => state.app.appTheme);
  const [selectedNumber, setSelectedNumber] = useState(quantity > 0 ? 1 : 0);
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (vouchers.status === c.LOADING) dispatch(voucherActions.getAllVoucher());
  });
  function increaseNumber() {
    if (selectedNumber + 1 <= quantity)
      setSelectedNumber(selectedNumber + 1);
  }
  function decreaseNumber() {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  }
  function handleAddCart() {
    dispatch(
      cartActions.addCart(
        {
          product_id: _id,
          quantity: selectedNumber,
        },
        true
      )
    );
    dispatch(userActions.getUserBadges());
  }
  function handleToggleWishList() {
    dispatch(productActions.toggleWishList(_id, props.isLiked));
    dispatch(userActions.getUserBadges());
  }
  return (
    <div>
      <div className="main-info row">
        <div className="product-images">
          <button className="like-btn" onClick={handleToggleWishList}>
            <i className={props.isLiked ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
          <ToastContainer />
          <Slider {...settings}>
            {images.map((v, i) => (
              <div className="image" key={i}>
                <div className="img-container">
                  <img
                    src={v}
                    alt="product"
                    style={{
                      background: `url(${c.DEFAULT_PRODUCT_IMG})`,
                      backgroundSize: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="product-order-info">
          <div className="name">{name}</div>
          <div className="price-wraper">
            <div className="price" style={{ color: appTheme.color_main_1 }}>
              ₫{formatPrice(after_discount_price)}
            </div>
          </div>
          <div className="cart-action">
            Số lượng <br />
            <div className="row">
              <button
                style={{ borderRight: "1px solid rgb(228, 228, 228)" }}
                onClick={decreaseNumber}>-</button>
              <input type="number" value={selectedNumber} onChange={() => { }} />
              <button
                style={{ borderLeft: "1px solid rgb(228, 228, 228)" }}
                onClick={increaseNumber}>+</button>
            </div>
            <div className="actions">
              {quantity > 0
                ?
                <button
                  id="addcart-btn"
                  onClick={handleAddCart}
                  style={{ background: appTheme.color_main_1 }} >
                  Thêm vào giỏ hàng </button>
                :
                <button style={{ marginTop: "0em" }} id="soldout-btn">Hết hàng</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
