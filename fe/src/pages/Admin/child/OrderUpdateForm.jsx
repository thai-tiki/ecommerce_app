import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { formatPrice, showNextElement } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
import { cartActions } from "../../../actions/cartActions";
import Select from "../../../components/Select";
export default function OrderUpdateForm(props) {
  const {
    date,
    items,
    status,
    address,
    items_in_time,
    payment_method,
    shipment_method,
    total_before_discount,
    total_after_discount } = props.order;
  const dispatch = useDispatch();
  const lastStatus = props.order.status.code;
  const [currentStatus, setCurrentStatus] = useState(status);
  const orderStatus = [
    {
      code: "WAITING_FOR_PROGRESSING",
      name: "Chờ xử lý"
    },
    {
      code: "SHOP_CANCELED",
      name: "Shop đã hủy"
    },
    {
      code: "CUSTOMER_CANCELED",
      name: "Khách đã hủy"
    },
    {
      code: "COMPLETED",
      name: "Hoàn thành"
    }
  ]
  function handleSubmit() {
    let newInfo = { ...props.order };
    newInfo.status = currentStatus;
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(cartActions.updateOrder(newInfo))
  }
  function handleChangeOrderStatus(v) {
    setCurrentStatus(v)
  }
  useEffect(() => {
    console.log(props.order);
  }, [])
  return (
    <div className="modal center">
      <div className="form-container">
        <button
          className="close-btn"
          style={
            { zIndex: "10" }
          }
          onClick={props.handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div
          className="order-form hide-scroll"
          style={
            { position: "relative" }
          }
        >
          <div className="row" >
            <label htmlFor="name">Tên người nhận</label>
            <input
              id="name"
              type="text"
              name="name"
              disabled={true}
              spellCheck={false}
              autoComplete="off"
              defaultValue={address.name}
            />
          </div>
          <div className="row" >
            <label htmlFor="name">SĐT</label>
            <input
              id="name"
              type="text"
              name="name"
              disabled={true}
              spellCheck={false}
              autoComplete="off"
              defaultValue={address.phone}
            />
          </div>
          <div className="row" >
            <label htmlFor="name">Địa chỉ</label>
            <input
              id="name"
              type="text"
              name="name"
              disabled={true}
              spellCheck={false}
              autoComplete="off"
              defaultValue={address.location}
            />
          </div>
          <div className="row" >
            <label htmlFor="name">Ngày đặt</label>
            <input
              id="name"
              type="text"
              name="name"
              disabled={true}
              spellCheck={false}
              autoComplete="off"
              defaultValue={date}
            />
          </div>
          <div className="row">
            <label htmlFor="before_discount_price">
              Giá trị đơn hàng
            </label>
            <input
              type="text"
              disabled={true}
              id="before_discount_price"
              name="before_discount_price"
              defaultValue={formatPrice(total_after_discount)}
            />
          </div>
          <div className="row">
            <label htmlFor="before_discount_price">
              Giảm giá
            </label>
            <input
              type="text"
              disabled={true}
              id="before_discount_price"
              name="before_discount_price"
              defaultValue={formatPrice(total_before_discount - total_after_discount)}
            />
          </div>
          <div className="row">
            <label>Trạng thái</label>
            <Select
              values={
                orderStatus.map(v => {
                  return { title: v.name, ...v }
                })
              }
              placeholder={currentStatus.name}
              handleSelect={handleChangeOrderStatus}
              showDetail={showNextElement}
            />
          </div>
          <div className="row">
            <label htmlFor="before_discount_price">
              Thanh toán
            </label>
            <input
              type="text"
              disabled={true}
              id="before_discount_price"
              name="before_discount_price"
              defaultValue={payment_method.name}
            />
          </div>
          <div className="row">
            <label htmlFor="before_discount_price">
              Giao hàng
            </label>
            <input
              type="text"
              disabled={true}
              id="before_discount_price"
              name="before_discount_price"
              defaultValue={shipment_method.name + ` (${formatPrice(shipment_method.fee)})`}
            />
          </div>
          <div className="row">
            <label htmlFor="after_discount_price">
              Ghi chú
            </label>
            <input
              type="text"
              disabled={true}
              id="after_discount_price"
              name="after_discount_price"
              defaultValue="This is my note"
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Giảm</th>
                <th>SL</th>
              </tr>
            </thead>
            <tbody>
              {
                items_in_time.map((v, i) =>
                  <tr key={v._id}>
                    <td>{i + 1}</td>
                    <td >
                      <div className="product-show">
                        <div className="image">
                          <div className="img-container">
                            <img src={items[i].images[0]} alt="" />
                          </div>
                        </div>
                        <div className="name" style={{ maxWidth: "250px" }}>
                          {items[i].name}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="price">
                        {formatPrice(v.before_discount_price)}
                      </div>
                    </td>
                    <td>
                      <div className="price">
                        {formatPrice(v.before_discount_price - v.after_discount_price)}
                      </div>
                    </td>
                    <td>{v.quantity}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <button
            id="submit-btn"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}