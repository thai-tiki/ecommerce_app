import { useSelector, useDispatch } from "react-redux";
import Login from "./child/Login";
import Voucher from "./child/Voucher";
import Register from "./child/Register";
import RattingPopup from "./child/Ratting";
import PhoneCheck from "./child/PhoneCheck";
import ForgotPass from "./child/ForgotPass";
import AutoHidePopup from "./child/AutoHide";
import OrderSuccess from "./child/OrderSuccess";
import MessagePopup from "./child/MessagePopup";
import { constants as c } from "../../constants";
import { appActions as a } from "../../actions/appActions";
import Profile from "./child/Profile";
function Popup() {
  const dispatch = useDispatch();
  function handleClosePopup() {
    dispatch(a.changePopup(c.NO_POPUP));
  }
  const popupInfo = useSelector(state => state.app.popup);
  const popups = {
    [c.NO_POPUP]: <div></div>,
    [c.MESSAGE_POPUP]: <MessagePopup />,
    [c.AUTOHIDE_POPUP]: <AutoHidePopup />,
    [c.VOUCHER_POPUP]: <Voucher handleClose={handleClosePopup} />,
    [c.LOGIN_POPUP]: <Login handleClose={handleClosePopup} />,
    [c.REGIS_POPUP]: <Register handleClose={handleClosePopup} />,
    [c.PHONE_POPUP]: <PhoneCheck handleClose={handleClosePopup} />,
    [c.ORDER_POPUP]: <OrderSuccess andleClose={handleClosePopup} />,
    [c.RATTING_POPUP]: <RattingPopup handleClose={handleClosePopup} />,
    [c.PROFILE_POPUP]: <Profile handleClose={handleClosePopup} />,
    [c.FORGOT_PASS_POPUP]: <ForgotPass handleClose={handleClosePopup} />
  }
  return (
    popups[popupInfo.type]
  )
}
export default Popup