import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../actions/userActions";
export default function PhoneCheck(props) {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [errMsg, setMsg] = useState("");
  const appTheme = useSelector(state => state.app.appTheme);
  function handlePhoneCheck() {
    if (phone.length === 0) {
      setMsg("Số điện thoại không được để trống !");
      return;
    }
    if (phone.length < 7) {
      setMsg("Số điện thoại không hợp lệ !");
      return;
    }
    dispatch(userActions.accountCheck({ email: null, phone_number: phone }));
  };
  function handleInputChange(e) {
    setPhone(e.target.value);
  }
  function handleEnter(e) {
    if (e.key === "Enter")
      handlePhoneCheck()
  }
  return (
    <div className="modal center">
      <div className="phone-popup" onKeyDown={handleEnter}>
        <h4>Xin chào</h4>
        <div>Vui lòng nhập số điện thoại</div>
        <input autoFocus type="number" value={phone} placeholder="Số điện thoại" onChange={handleInputChange} />
        {errMsg &&
          <div className="err-msg">{errMsg}</div>
        }
        <button
          className="next-btn"
          onClick={handlePhoneCheck}
          style={{ background: appTheme.color_main_1 }}>Tiếp tục</button>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}