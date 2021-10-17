import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions as a } from "../../../actions/cartActions";
export default function VoucherInput(props) {
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const [code, setCode] = useState("");
  function applyVoucher() {
    if (!code) return;
    if (!cartInfo.voucher) {
      props.handleChange("voucher", code);
      dispatch(a.applyDiscount("voucher", code));
      return;
    }
    props.handleChange("voucher", "");
    dispatch(a.applyDiscount("voucher", ""));
  }
  function handleChange(e) {
    setCode(e.target.value);
  }
  useEffect(() => {
    console.log(cartInfo.voucher);
    setCode(
      cartInfo.voucher
        ? cartInfo.voucher.code
        : "")
  }, [cartInfo.voucher])
  return (
    <div className="voucher-input" style={{ position: "relative" }}>
      <h5>Mã giảm giá</h5>
      <button
        className="show-modal-btn"
        onClick={() => props.handleShowPopup("voucher")}>
        Danh sách voucher
      </button>
      <div className="row">
        <input
          disabled={cartInfo.voucher !== null}
          type="text"
          placeholder="Nhập voucher"
          value={code}
          onChange={handleChange}
        />
        {
          cartInfo.voucher ?
            <button onClick={() => applyVoucher("")}>
              Hủy
            </button>
            :
            <button onClick={() => applyVoucher(props.code)}>
              Áp dụng
            </button>
        }
      </div>
    </div>
  )
}