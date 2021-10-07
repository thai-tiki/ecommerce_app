import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./child/ItemCard";
import { formatPrice } from "../../helper";
import Header from "../../components/Header";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { cartActions as a } from "../../actions/cartActions";
import OrderSuccess from "../../components/Popup/child/OrderSuccess";


function OrderInfoPage(props) {
  const dispatch = useDispatch();
  const orderInfo = useSelector(state => state.cart.orderInfo);
  const appTheme = useSelector(state => state.app.appTheme);
  const myRef = useRef(null);
  useEffect(() => {
    document.title = `Thông tin đơn hàng ${props.match.params.id}`
    if (orderInfo.status === c.LOADING)
      dispatch(a.getOrderInfo(props.match.params.id))
  });
  function handleShowProduct(id) {
    window.location.href = `/san-pham/${id}`
  }
  function handleCancelOrder() {
    dispatch(a.cancelOrder({
      order_code: orderInfo.info.order_code
    }))
  }
  function openRattingForm(product) {
    dispatch(appActions.changePopup(
      c.RATTING_POPUP,
      "",
      {
        id: product.id,
        name: product.name,
        orderCode: orderInfo.info.order_code,
      }
    ));
  }
  function isReviewable(product) {
    let arr = orderInfo.info.line_items.filter((v) => {
      return v.product.id === product.id
    });
    let rs = arr.length > 0 && arr[0].reviewed === false
    return rs
  }
  function handleScrollTo() {
    let top = myRef.current.offsetTop;
    window.scroll({
      top,
      behavior: "smooth"
    })
  }
  function openPaymentDialog() {
    dispatch({
      type: c.CHANGE_POPUP,
      popupType: c.ORDER_POPUP,
      orderPopupTitle: {
        title: "Thanh toán!",
        subTitle:
          "Hãy thanh toán ngay hoặc thay đổi hình thức thanh toán.",
      },
      paymentMethod: {
        payment_method_name: orderInfo.info.payment_method_name,
        payment_method_id: orderInfo.info.payment_method_id,
        order_code: orderInfo.info.order_code,
      },
    });
  }
  return (
    <React.Fragment>
      <Header />
      {
        orderInfo.status === c.LOADING ? <PageLoading /> :
          <div className="order-info-page">
            <div className="container">
              <div className="title">
                {`Chi tiết đơn hàng ${orderInfo.info.order_code}`} - <span> {orderInfo.info.order_status_name}</span>
              </div>
              {
                orderInfo.info.order_status_code === "WAITING_FOR_PROGRESSING" &&
                <button onClick={handleCancelOrder}>Hủy đơn hàng</button>
              }
              <div className="date">{`Ngày đặt hàng: ${orderInfo.info.created_at}`}</div>
              <div className="row" style={{ width: "fit-content" }}>
                <div className="date"> {`${orderInfo.info.payment_status_name}`}</div>
                {
                  orderInfo.info.order_status_code === "COMPLETED"
                  && (!orderInfo.info.reviewed ?
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleScrollTo}
                      className="date">&nbsp;| Đánh giá sản phẩm</div>
                    :
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleScrollTo}
                      className="date">&nbsp;| Đã đánh giá</div>
                  )
                }
              </div>
              <div className="row">
                <div className="user-info">
                  <div className="title">ĐỊA CHỈ NGƯỜI NHẬN</div>
                  <div className="info">
                    <h4>{orderInfo.info.customer_address.name}</h4>
                    <div>
                      <span>Địa chỉ: </span>
                      {
                        orderInfo.info.customer_address.address_detail + ", "
                        + orderInfo.info.customer_address.wards_name + ", "
                        + orderInfo.info.customer_address.district_name + ", "
                        + orderInfo.info.customer_address.province_name + ", "
                      }
                    </div>
                    <div>
                      <span>Điện thoại: </span> {orderInfo.info.customer_address.phone}
                    </div>
                  </div>
                </div>
                <div className="shipment-info">
                  <div className="title">HÌNH THỨC GIAO HÀNG</div>
                  <div className="info">
                    <div>
                      {orderInfo.info.shipper_name}
                    </div>
                    <div>
                      {`Phí vận chuyển: đ ${formatPrice(orderInfo.info.total_shipping_fee)}`}
                    </div>
                  </div>
                </div>
                <div className="payment-info">
                  <div className="title">THANH TOÁN</div>
                  <div className="info">
                    <div>
                      {orderInfo.info.payment_method_name}
                    </div>
                    <div>
                      {`Tổng giá trị sản phẩm: đ ${formatPrice(orderInfo.info.total_after_discount)}`}
                    </div>
                    {
                      orderInfo.info.payment_status_code === "UNPAID" &&
                      ["WAITING_FOR_PROGRESSING", "PACKING"].includes(orderInfo.info.order_status_code) &&
                      <button
                        onClick={openPaymentDialog}
                        style={{
                          padding: "6px 8px",
                          borderRadius: "0.25em",
                          color: "white",
                          marginTop: "0.5em",
                          background: appTheme.color_main_1
                        }}
                      >Thanh toán</button>
                    }
                  </div>
                </div>
              </div>
              <table ref={myRef}>
                <thead>
                  <tr>
                    <th className="product">Sản phẩm</th>
                    <th className="prePrice">Giá</th>
                    <th className="number">Số lượng</th>
                    <th className="discount">Giảm giá</th>
                    <th className="price">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderInfo.info.line_items_at_time.map((v, i) =>
                      <tr key={i}>
                        <td className="product">
                          <div className="row">
                            <div className="image">
                              <div className="img-container">
                                <img src={v.image_url} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
                              </div>
                            </div>
                            <div className="action">
                              <div className="name">
                                {v.name}
                              </div>
                              {
                                orderInfo.info.order_status_code === "COMPLETED" &&
                                <React.Fragment>
                                  {
                                    isReviewable(v) &&
                                    <>
                                      <button onClick={() => openRattingForm(v)}>Đánh giá</button>
                                      <span> | </span>
                                    </>
                                  }
                                </React.Fragment>
                              }
                              <button onClick={() => handleShowProduct(v.id)}>Xem thông tin</button>
                            </div>
                          </div>
                        </td>
                        <td className="prePrice">₫ {formatPrice(v.before_discount_price)}</td>
                        <td className="number">{v.quantity}</td>
                        <td className="discount">₫ {formatPrice(v.before_discount_price - v.after_discount)}</td>
                        <td className="price">₫ {formatPrice(v.after_discount * v.quantity)}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <div className="mobile">
                <div className="title" style={{ marginTop: "0.25em", marginBottom: "0.25em" }}>Thông tin kiện hàng</div>
                {
                  orderInfo.info.line_items_at_time.map((v, i) =>
                    <ItemCard
                      key={i}
                      id={v.id}
                      name={v.name}
                      image={v.image_url}
                      number={v.quantity}
                      price={v.after_discount}
                      status={orderInfo.info.order_status_code}
                    />
                  )
                }
              </div>
            </div>
          </div>
      }
    </React.Fragment>
  )
}
export default OrderInfoPage