import { useSelector, useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
export default function Login(props) {
  const dispatch = useDispatch();
  const phone = useSelector(state => state.user.phone);
  function handleBack() {
    dispatch(appActions.changePopup(c.PHONE_POPUP));
  }
  return (
    <div className="modal center">
      <div className="login-popup">
        <h4>Nhập mã xác minh</h4>
        <div>Nhập mã xác minh vừa được gửi đến <span>{phone}</span></div>
        <input type="number" placeholder="Mã xác nhận" />
        <button className="next-btn">Xác nhận</button>
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