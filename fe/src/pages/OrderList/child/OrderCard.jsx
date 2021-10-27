import { formatPrice } from "../../../helper"
export default function OrderCard(props) {
  console.log(props)
  const { items, total_after_discount, status } = props;
  const image = items[0].images[0];
  const name = items[0].name;
  function handleShowInfo() {
    window.location.href = `/don-hang/${props._id}`;
  }
  return (
    <div className="order-card" onClick={() => handleShowInfo(props.orderCode)}>
      <div className="row">
        <div className="image">
          <div className="img-container">
            <img
              src={image}
              alt=""
              style={{
                background: "url(/img/default_product.jpg)",
                backgroundSize: "contain"
              }}
            />
          </div>
        </div>
        <div className="info">
          <div>{name}</div>
          <span>{`${items.length} sản phẩm | ${formatPrice(total_after_discount)} ₫`}</span>
          <p>{status.name}</p>
        </div>
      </div>
    </div>
  )
}