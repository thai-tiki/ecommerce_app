import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestOtp } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
export default function ForgotPass(props) {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const phone = useSelector(state => state.user.phone);
  const message = useSelector(state => state.app.message);
  const [requestInfo, setRequestInfo] = useState({
    phone_number: phone,
    password: "",
    otp: ""
  });
  const appTheme = useSelector(state => state.app.appTheme);
  function handleBack() {
    dispatch(appActions.changePopup(c.LOGIN_POPUP));
  };
  function handleResetPass() {
    dispatch(userActions.resetPassword(requestInfo));
  }
  function handleInputChange(e) {
    let info = { ...requestInfo };
    info[e.target.name] = e.target.value;
    setRequestInfo(info);
  }
  function handleResendOtp() {
    if (timer > 0)
      return;
    requestOtp(phone);
    setTimer(30);
  }
  return (
    <div className="modal center">
      <div className="forgot-pass-popup">
        <h4>Quên mật khẩu ?</h4>
        <div>Vui lòng nhập mật khẩu mới và mã xác nhận<br />
          được gửi tới <span>{phone}</span> để khôi phục mật khẩu.</div>
        <input
          autoFocus
          name="password"
          type="password"
          placeholder="Mật khẩu mới"
          value={requestInfo.password}
          onChange={handleInputChange} />
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: "0.5em" }}>
          <input
            autoComplete="off"
            name="otp"
            type="text"
            placeholder="Mã xác nhận"
            value={requestInfo.otp}
            style={{ width: "calc(100% - 7.5em)", marginTop: 0 }}
            onChange={handleInputChange}
          />
          <button
            onClick={handleResendOtp}
            style={{
              width: "7em",
              fontSize: "15px",
              height: "100%",
              borderRadius: "0.25em",
              border: "1px solid #e4e4e4",
              padding: "0.75em 0em",
              color: "#757575"
            }}
          >
            {
              timer ?
                `Gửi lại (${timer}s)`
                : "Gửi OTP"
            }
          </button>
        </div>
        <button
          className="next-btn"
          onClick={handleResetPass}
          style={{ background: appTheme.color_main_1 }}>
          Xác nhận
        </button>
        <p>{message}</p>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    </div>
  )
}