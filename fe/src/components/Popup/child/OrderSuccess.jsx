import { useDispatch } from "react-redux";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
export default function OrderSuccess(props) {
  const dispatch = useDispatch();
  function handleChangePage() {
    dispatch(appActions.changePopup(c.NO_POPUP));
  }
  return (
    <div className="modal center">
      <div className="order-popup">
        <button
          onClick={() => window.location.reload()}
          className="close-btn"
        >
          <i className="fas fa-times"></i>
        </button>
        <h4>
          <i className="fas fa-check-circle"></i>
          &nbsp;Đặt hàng thành công !
        </h4>
        <p>Vui lòng chờ xác nhận từ cửa hàng !</p>
        <div className="row">
          <a onClick={handleChangePage} href="/">Trang chủ</a>
          <a onClick={handleChangePage} href="/don-hang">Đơn mua</a>
        </div>
      </div>
    </div>
  )
}