import { formatPrice } from "../helper";
import { constants as c } from "../constants";
export default function VoucherCard(props) {
  return (
    <div className="voucher-card">
      <div className="top row">
        <button className="info-btn">
          Voucher
        </button>
        <div className="name">
          <div>
            {props.name}
          </div>
        </div>
        <div className="info">
          <div>
            <div className="value">
              Giảm {
                props.type === c.PERCENT_DISCOUNT
                  ? props.value + "%"
                  : "₫" + formatPrice(props.value)}
            </div>
            <div className="code">
              <span>Mã: </span> {props.code}
            </div>
            {
              props.min_order_value > 0 &&
              <div className="apply">
                Cho đơn hàng từ {formatPrice(props.min_order_value)}
              </div>
            }
          </div>
          <div className="end">
            <span>HSD: </span> {props.end}
          </div>
        </div>
      </div>
    </div>
  )
}