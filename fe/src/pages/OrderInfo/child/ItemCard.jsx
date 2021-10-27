import { formatPrice } from "../../../helper";
export default function ItemCard(props) {
  console.log(props.canRating)
  return (
    <a href={`/san-pham/${props.id}`} className="item-card">
      <div className="image">
        <div className="img-container">
          <img
            src={props.images[0]}
            alt=""
            style={{
              background: "url(/img/default_product.jpg)",
              backgroundSize: "contain"
            }}
          />
        </div>
      </div>
      <div className="info">
        <div className="name">
          {props.name}
        </div>
        <div className="row">
          <span>{`${formatPrice(props.after_discount_price)} x `}</span>
          &nbsp;{props.quantity}
          {
            props.canRating &&
            <>
              <span>&nbsp;| Đánh giá</span>
            </>
          }
        </div>
      </div>
    </a>
  )
}