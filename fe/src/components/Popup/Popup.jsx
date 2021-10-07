import { useSelector, useDispatch } from "react-redux";
import Login from "./child/Login";
import OTPInput from "./child/OTPInput";
import Register from "./child/Register";
import RattingPopup from "./child/Ratting";
import PhoneCheck from "./child/PhoneCheck";
import ForgotPass from "./child/ForgotPass";
import AutoHidePopup from "./child/AutoHide";
import OrderSuccess from "./child/OrderSuccess";
import MessagePopup from "./child/MessagePopup";
import { constants as c } from "../../constants";
import { appActions as a } from "../../actions/appActions";
import ProfilePopup from "./child/ProfilePopup";
function Popup() {
  const dispatch = useDispatch();
  function handleClosePopup() {
    dispatch(a.changePopup(c.NO_POPUP));
  }
  const popups = {
    [c.NO_POPUP]: <div></div>,
    [c.MESSAGE_POPUP]: <MessagePopup />,
    [c.AUTOHIDE_POPUP]: <AutoHidePopup />,
    [c.LOGIN_POPUP]: <Login handleClose={handleClosePopup} />,
    [c.OTP_POPUP]: <OTPInput handleClose={handleClosePopup} />,
    [c.REGIS_POPUP]: <Register handleClose={handleClosePopup} />,
    [c.PHONE_POPUP]: <PhoneCheck handleClose={handleClosePopup} />,
    [c.ORDER_POPUP]: <OrderSuccess andleClose={handleClosePopup} />,
    [c.RATTING_POPUP]: <RattingPopup handleClose={handleClosePopup} />,
    [c.PROFILE_POPUP]: <ProfilePopup handleClose={handleClosePopup} />,
    [c.FORGOT_PASS_POPUP]: <ForgotPass handleClose={handleClosePopup} />
  }
  const currentPopup = useSelector(state => state.app.currentPopup);
  return (
    popups[currentPopup]
  )
}
export default Popup