import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import { constants as c } from "../../../constants";
export default function VoucherInput(props) {
  const dispatch = useDispatch();
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const [code, setCode] = useState("");
  function applyVoucher() {
    if (!code) return;
    if (!cartInfo.voucher) {
      props.handleChange("voucher", code);
      dispatch(cartActions.applyDiscount("voucher", code));
      return;
    }
    props.handleChange("voucher", "");
    dispatch(cartActions.applyDiscount("voucher", ""));
  }
  function handleChange(e) {
    setCode(e.target.value);
  }
  useEffect(() => {
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
        onClick={() => dispatch(appActions.changePopup(c.VOUCHER_POPUP))}>
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