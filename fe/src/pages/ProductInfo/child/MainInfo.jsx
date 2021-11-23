import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice, convertMoney } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import { userActions } from "../../../actions/userActions";
import { productActions } from "../../../actions/productActions";
import { voucherActions } from "../../../actions/voucherActions";
import { ToastContainer } from "react-toastify";
import Slider from "react-slick";
import "react-toastify/dist/ReactToastify.css";
export default function MainInfo(props) {
  let {
    _id,
    name,
    images,
    quantity,
    rating,
    after_discount_price,
    before_discount_price,
  } = props.product;
  if (!images.length) images.push({ image_url: "/img/default_product.jpg" });
  const discount = Math.ceil((before_discount_price - after_discount_price) / before_discount_price * 100);
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const vouchers = useSelector((state) => state.voucher.list);
  const [selectedNumber, setSelectedNumber] = useState(quantity > 0 ? 1 : 0);
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
  }, []);
  function increaseNumber() {
    if (selectedNumber + 1 <= quantity)
      setSelectedNumber(selectedNumber + 1);
  }
  function decreaseNumber() {
    if (selectedNumber > 1) setSelectedNumber(selectedNumber - 1);
  }
  function handleAddCart() {
    if (!token) {
      dispatch(appActions.changePopup(c.PHONE_POPUP));
      return;
    }
    dispatch(cartActions.addCart(
      {
        product_id: _id,
        quantity: selectedNumber,
      },
      true
    ));
  }
  function handleToggleWishList() {
    if (!token) {
      dispatch(appActions.changePopup(c.PHONE_POPUP));
      return;
    }
    dispatch(productActions.toggleWishList(_id));
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
          <div className="sale-info">
            <div className="rating">
              {
                [1, 2, 3, 4, 5].map(v =>
                  <i className="fas fa-star"></i>
                )
              }
              <span>({rating.list.length} đánh giá)</span>
              <span> | </span>
              <span>Đã bán 14</span>
            </div>
          </div>
          <div className="price-wraper">
            <div className="price">
              {formatPrice(after_discount_price)} ₫
            </div>
            {
              discount > 0 &&
              <div className="row">
                <div className="past-price">
                  {formatPrice(before_discount_price)} ₫
                </div>
                <div className="discount">
                  -{discount}%
                </div>
              </div>
            }
          </div>
          <div className="product-voucher">
            <span>0{vouchers.data.length} Mã giảm giá</span>
            <div className="row">
              {
                vouchers.data.map(v =>
                  <div className="voucher-tag" key={v._id}>
                    Giảm&nbsp;
                    {
                      v.type === "VALUE_DISCOUNT"
                        ? convertMoney(v.value)
                        : `${v.value}%`
                    }
                  </div>
                )
              }
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
                >
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
