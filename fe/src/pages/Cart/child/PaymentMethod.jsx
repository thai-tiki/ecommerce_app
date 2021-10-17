import { useSelector } from "react-redux";
export default function PaymentMethod(props) {
  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  return (
    <div className="payment-method">
      <h5>Phương thức thanh toán</h5>
      {paymentMethod.list.map((v, i) => (
        <div className="row" key={i}>
          <input
            type="checkbox"
            name="delivery"
            id={v._id}
            checked={props.selected === v._id}
            onChange={() => props.handleChange("payment_method", v._id)}
          />
          <label htmlFor={v._id}>{v.name}</label>
        </div>
      ))}
    </div>
  )
}