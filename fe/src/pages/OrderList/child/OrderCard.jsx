import { formatPrice } from "../../../helper"
export default function OrderCard(props) {
  return (
    <div className="order-card" onClick={() => props.onClick(props.orderCode)}>
      <div className="status">{props.status}</div>
      <div className="row">
        <div className="image">
          <div className="img-container">
            <img src={props.image} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
          </div>
        </div>
        <div className="info">
          <div>{props.name}</div>
          <span>{`${props.nItems} sản phẩm | ₫ ${formatPrice(props.total)}`}</span>
        </div>
      </div>
    </div>
  )
}