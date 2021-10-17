import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
export default function PriceInfo(props) {
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const {
    total_after_discount,
    total_before_discount,
  } = cartInfo;
  return (
    <div className="price-info">
      <div className="row">
        <div>Tạm tính</div>
        <span>₫ {formatPrice(total_before_discount)}</span>
      </div>
      <div className="row">
        <div>Giảm giá</div>
        <span>
          ₫ {formatPrice(total_before_discount - total_after_discount)}
        </span>
      </div>
      <div className="total row">
        <div>Tổng cộng</div>
        <span>₫ {formatPrice(total_after_discount)}</span>
      </div>
      <button id="order-btn" onClick={props.handleOrder}>
        Đặt hàng
      </button>
    </div>
  )
}