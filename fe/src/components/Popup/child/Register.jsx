import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { userActions } from "../../../actions/userActions";
import { constants as c } from "../../../constants";
export default function Login(props) {
  const dispatch = useDispatch();
  const phone = useSelector(state => state.user.phone);
  const message = useSelector(state => state.user.message);
  const [timer, setTimer] = useState(0);
  const [validateMsg, setValidateMsg] = useState("");
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [regisInfo, setRegisInfo] = useState({
    phone: phone,
    email: "",
    name: "",
    otp: "",
    password: "",
    sex: -1
  });
  function handleBack() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  };
  function handleInputChange(e) {
    let info = { ...regisInfo };
    info[e.target.name] = e.target.value;
    if (e.target.name === "sex")
      info.sex = parseInt(e.target.value);
    setRegisInfo(info);
  }
  function handleRegis() {
    if (!regisInfo.email
      || !regisInfo.password
      || !regisInfo.sex === -1
      || !regisInfo.name) {
      setIsSentRequest(false);
      setValidateMsg("Vui lòng điền đầy đủ thông tin !");
      return;
    }
    console.log(regisInfo)
    setValidateMsg("");
    setIsSentRequest(true);
    dispatch({ type: c.CLEAR_MESSAGE });
    dispatch(userActions.accountRegis(regisInfo));
  };
  useEffect(() => {
    if (!timer)
      return;
    let myTimer = setInterval(() => {
      setTimer(timer - 1 >= 0 ? timer - 1 : 0)
    }, 1000);
    return () => clearInterval(myTimer)
  })
  return (
    <div className="modal center">
      <div className="regis-popup">
        <h4>Nhập thông tin đăng ký</h4>
        <input
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Họ tên"
          value={regisInfo.name}
          onChange={handleInputChange}
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={regisInfo.email}
          onChange={handleInputChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={regisInfo.password}
          onChange={handleInputChange}
        />
        <div className="row">
          <label>Giới tính: </label>
          <div>
            <div className="row">
              <label htmlFor="male">
                Nam
              </label>
              <input
                checked={regisInfo.sex === 1}
                name="sex"
                value="1"
                type="checkbox"
                id="male"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="female">
                Nữ
              </label>
              <input
                checked={regisInfo.sex === 2}
                name="sex"
                value="2"
                type="checkbox"
                id="female"
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="other">
                Khác
              </label>
              <input
                checked={regisInfo.sex === 0}
                name="sex"
                value="0"
                type="checkbox"
                id="other"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        {
          validateMsg
          &&
          <div className="err-msg" style={{ textAlign: "center", marginTop: "0", marginBottom: "8px" }}>
            {validateMsg}
          </div>
        }
        {
          !validateMsg
          &&
          isSentRequest && !message
          &&
          <div
            className="err-msg"
            style={{
              fontSize: "12px",
              textAlign: "center",
              marginTop: "0",
              marginBottom: "8px"
            }}>
            Vui lòng chờ...
          </div>
        }
        {
          isSentRequest && message && !validateMsg
          &&
          <div className="err-msg" style={{ textAlign: "center", marginTop: "0", marginBottom: "8px" }}>
            {message}
          </div>
        }
        <button className="next-btn" onClick={handleRegis}>
          Xác nhận
        </button>
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    </div >
  )
}