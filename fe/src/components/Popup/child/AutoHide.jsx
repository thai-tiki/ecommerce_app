import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { constants } from "../../../constants";
export default function AutoHidePopup() {
  const dispatch = useDispatch();
  const popupInfo = useSelector(state => state.app.popup);
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.changePopup(constants.NO_POPUP))
    }, 500)
  });
  return (
    <div className="modal center" style={{ background: "none" }}>
      <div className="autohide-popup">
        {popupInfo.msg}
      </div>
    </div>
  )
}