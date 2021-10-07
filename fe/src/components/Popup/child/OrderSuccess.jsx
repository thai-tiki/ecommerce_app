import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "../../../components/Select";
import { showNextElement, hideParentElement } from "../../../helper";
import { constants as c } from "../../../constants";
import { appServices } from "../../../services/appServices";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
export default function OrderSuccess(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector(state => state.app.appTheme);
  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  const orderInfo = useSelector(state => state.app.orderPopup);
  const selectValues = useMemo(
    () => paymentMethod.list.map((v) => { return { title: v.name, id: v.id } }),
    [paymentMethod]);
  function handlePaymentRequest() {
    const url = `${c.API_URL}/customer/${appServices.store_code}/purchase/pay/${orderInfo.order_code}`;
    window.open(url);
    window.location.reload();
  }
  function handleChangePage() {
    dispatch(appActions.changePopup(c.NO_POPUP));
  }
  function handleChangePaymentMethod(value, e) {
    let info = {
      orderCode: orderInfo.order_code,
      paymentMethodId: value.id,
      paymentMethodName: value.title
    }
    console.log(info);
    hideParentElement(e);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(cartActions.changePaymentMethod(info));
  }
  useEffect(() => {
    if (paymentMethod.status === c.LOADING)
      dispatch(cartActions.getPaymentMethods());
  }, [])
  return (
    <div className="modal center">
      <div className="order-popup">
        <button onClick={() => window.location.reload()} className="close-btn"><i className="fas fa-times"></i></button>
        <h4><i style={{ color: appTheme.color_main_1 }} className="fas fa-check-circle"></i> {orderInfo.title}</h4>
        <p>{orderInfo.subTitle}</p>
        {
          orderInfo.payment_method_id !== 0 &&
          <button
            onClick={handlePaymentRequest}
            style={{ background: appTheme.color_main_1 }}>
            Thanh toán ngay
          </button>
        }
        <div className="row">
          <a onClick={handleChangePage} href="/">Trang chủ</a>
          <a onClick={handleChangePage} href="/don-hang">Đơn mua</a>
        </div>
        <span style={{ color: appTheme.color_main_1 }}>Thay đổi phương thức thanh toán</span>
        <Select
          handleSelect={handleChangePaymentMethod}
          showDetail={showNextElement}
          placeholder={orderInfo.payment_method_name}
          values={selectValues}
        />
      </div>
    </div>
  )
}