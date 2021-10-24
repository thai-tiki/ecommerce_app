import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../../helper";
import { cartActions } from "../../../actions/cartActions";
import { constants as c } from "../../../constants";
import DataLoading from "./DataLoading";
import OrderUpdateForm from "./OrderUpdateForm";
export default function OrderTab() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.cart.ordersList);
  const [currentForm, setCurrentForm] = useState("none");
  const [currentOrder, setCurrentOrder] = useState({});
  function handleUpdateOrder(order) {
    setCurrentForm("update");
    setCurrentOrder(order);
  }
  function closeForm() {
    setCurrentForm("none")
  }
  useEffect(() => {
    if (orders.status === c.LOADING)
      dispatch(cartActions.getOrdersList("", true));
  }, []);
  const formList = {
    update: <OrderUpdateForm handleClose={closeForm} order={currentOrder} />,
    none: <div />
  }
  return (
    <div className="product-tab tab">
      <div className="row">
        <h4>Quản lý đơn hàng</h4>
      </div>
      <div className="table-fixed">
        {
          orders.status === c.LOADING
            ? <DataLoading />
            :
            <table>
              <thead>
                <tr>
                  <th style={{ width: "230px" }}>Mã</th>
                  <th>Ngày đặt</th>
                  <th>Người nhận</th>
                  <th>Giá trị</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {
                  orders.list.map((v, i) =>
                    <tr key={v._id} onClick={() => handleUpdateOrder(v)}>
                      <td style={{ width: "230px" }}>{v._id}</td>
                      <td>{v.date}</td>
                      <td>{v.address.name}</td>
                      <td>{formatPrice(v.total_after_discount)}</td>
                      <td>{v.status.name}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
        }
      </div>
      {
        formList[currentForm]
      }
    </div>
  )
}