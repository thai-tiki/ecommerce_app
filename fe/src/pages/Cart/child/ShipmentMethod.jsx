import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
export default function ShipmentMethod(props) {
  const shipmentFee = useSelector(state => state.cart.shipmentMethod.list);
  return (
    <div className="delivery-method">
      <h5>Phí vận chuyển</h5>
      {
        shipmentFee.map((v, i) => (
          <div className="row" key={i}>
            <div className="row">
              <input
                type="checkbox"
                name="delivery"
                id={v._id}
                checked={props.selected === v._id}
                onChange={() => props.handleChange("shipment_method", v._id)}
              />
              <label htmlFor={v._id}>{v.name}</label>
            </div>
            <span>₫ {formatPrice(v.fee)}</span>
          </div>
        ))
      }
    </div>
  )
}