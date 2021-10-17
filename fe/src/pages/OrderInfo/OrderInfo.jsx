import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./child/ItemCard";
import { formatPrice } from "../../helper";
import ItemsTable from "./child/ItemsTable";
import Header from "../../components/Header";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading";
import { cartActions as a } from "../../actions/cartActions";
function OrderInfoPage(props) {
  const dispatch = useDispatch();
  const orderInfo = useSelector(state => state.cart.orderInfo);
  useEffect(() => {
    document.title = `Thông tin đơn hàng ${props.match.params.id}`
    if (orderInfo.status === c.LOADING)
      dispatch(a.getOrderInfo(props.match.params.id));
    console.log(orderInfo)
  });
  function handleCancelOrder() {
    dispatch(a.cancelOrder({
      order_code: orderInfo.info.order_code
    }))
  }
  return (
    <React.Fragment>
      <Header />
      {
        orderInfo.status === c.LOADING ? <PageLoading /> :
          <div className="order-info-page">
            <div className="container">
              <div className="title">
                {`Chi tiết đơn hàng ${orderInfo._id}`}
                -
                <span> {orderInfo.order_status.name}</span>
              </div>
              {
                orderInfo.status.code === "WAITING_FOR_PROGRESSING" &&
                <button onClick={handleCancelOrder}>Hủy đơn hàng</button>
              }
              <div className="date">{`Ngày đặt hàng: ${orderInfo.date}`}</div>
              <div className="row">
                <div className="user-info">
                  <div className="title">ĐỊA CHỈ NGƯỜI NHẬN</div>
                  <div className="info">
                    <h4>{orderInfo.address.name}</h4>
                    <div>
                      <span>Địa chỉ: </span>
                      {orderInfo.address.location}
                    </div>
                    <div>
                      <span>Điện thoại: </span> {orderInfo.address.phone}
                    </div>
                  </div>
                </div>
                <div className="shipment-info">
                  <div className="title">HÌNH THỨC GIAO HÀNG</div>
                  <div className="info">
                    <div>
                      {orderInfo.shipment_method.name}
                    </div>
                    <div>
                      {`Phí vận chuyển: đ ${formatPrice(orderInfo.shipment_method.fee)}`}
                    </div>
                  </div>
                </div>
                <div className="payment-info">
                  <div className="title">THANH TOÁN</div>
                  <div className="info">
                    <div>
                      {orderInfo.payment_method.name}
                    </div>
                    <div>
                      {`Tổng giá trị sản phẩm: đ ${formatPrice(orderInfo.total_after_discount)}`}
                    </div>
                  </div>
                </div>
              </div>
              <ItemsTable />
              <div className="mobile">
                <div className="title"
                  style={{
                    marginTop: "0.25em",
                    marginBottom: "0.25em"
                  }}
                >
                  Thông tin kiện hàng
                </div>
                {
                  orderInfo.items.map((v, i) =>
                    <ItemCard
                      key={i}
                      id={v.id}
                      name={v.name}
                      image={v.image_url}
                      number={v.quantity}
                      price={v.after_discount}
                      status={orderInfo.status.code}
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