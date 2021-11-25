import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../../helper";
import { cartActions as a } from "../../../actions/cartActions";
export default function CartItem(props) {
  const dispatch = useDispatch();
  let { quantity, images, _id, name, before_discount_price, after_discount_price } = props.product;
  let avt = "/img/default_product.jpg";
  if (images.length)
    avt = images[0];
  let [currentQuantity, setCurrentQuantity] = useState(props.quantity);
  function handleChangecurrentQuantity(e) {
    let q;
    if (e.target.value === "")
      q = 0;
    else {
      q = parseInt(e.target.value);
      q = q <= quantity ? q : quantity;
      a.changeNumberInCart({
        id: props._id,
        quanntity: q,
      });
    }
    setCurrentQuantity(q);
  }
  function handleIncrease() {
    if (currentQuantity + 1 <= quantity) {
      console.log(currentQuantity, props._id)
      dispatch(
        a.changeNumberInCart(
          props._id,
          currentQuantity + 1,
        )
      )
      setCurrentQuantity(currentQuantity + 1);
    }
  }
  function handleDecrease() {
    if (currentQuantity - 1 >= 0) {
      dispatch(
        a.changeNumberInCart(
          props._id,
          currentQuantity - 1,
        )
      )
      setCurrentQuantity(currentQuantity - 1)
    }
  }
  function handleRemoveItem() {
    dispatch(
      a.changeNumberInCart(
        props._id,
        0,
      )
    )
    setCurrentQuantity(0);
  }
  return (
    <div className="cart-item">
      <div className="row">
        <div className="image">
          <div className="img-container">
            <img
              src={avt}
              alt="product1"
              style={{
                background: "url(../img/default_product.jpg)",
                backgroundSize: "contain"
              }} />
          </div>
        </div>
        <div className="item-info">
          <a href={"/san-pham/" + _id} className="name">
            {name}
          </a>
          <div className="price">
            <div className="current-price">
              ₫ {formatPrice(after_discount_price)}
            </div>
            {
              before_discount_price !==
              after_discount_price &&
              <div className="past-price">
                ₫ {formatPrice(before_discount_price)}
              </div>
            }
          </div>
          <div className="row">
            <button onClick={handleDecrease}>-</button>
            <input
              type="number"
              value={currentQuantity}
              min={0}
              max={quantity}
              onChange={handleChangecurrentQuantity}
            />
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>
      </div>
      <button
        className="delete-btn"
        onClick={handleRemoveItem}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}