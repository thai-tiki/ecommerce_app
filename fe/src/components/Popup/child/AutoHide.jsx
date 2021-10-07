import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { constants } from "../../../constants";
export default function AutoHidePopup() {
  const dispatch = useDispatch();
  const message = useSelector(state => state.app.message);
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.changePopup(constants.NO_POPUP))
    }, 1000)
  });
  return (
    <div className="modal center" style={{ background: "none" }}>
      <div className="autohide-popup">
        {message}
      </div>
    </div>
  )
}