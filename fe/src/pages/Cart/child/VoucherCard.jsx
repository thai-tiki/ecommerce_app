import { formatPrice } from "../../../helper";
export default function VoucherCard(props) {
  return (
    <div className="voucher-card row">
      <button className="info-btn" style={{ backgroundColor: "green" }} onClick={() => props.onSelect(props.voucher.code)}>
        Áp dụng
      </button>
      <div className="name">
        <div>
          {props.voucher.name}
        </div>
      </div>
      <div className="info">
        <div>
          <div className="value">
            Giảm {props.voucher.discount_type === 1 ? props.voucher.value_discount + "%" : "₫" + formatPrice(props.voucher.value_discount)}
          </div>
          <div className="code">
            <span>Mã: </span> {props.voucher.code}
          </div>
          {
            props.voucher.value_limit_total &&
            <div className="apply">
              Cho đơn hàng từ {formatPrice(props.voucher.value_limit_total)}
            </div>
          }
        </div>
        <div className="end">
          <span>HSD: </span> {props.voucher.end_time.split(" ")[0]}
        </div>
      </div>
    </div>
  )
}