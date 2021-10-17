import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import { constants as c } from "../../../constants";
import { appActions } from "../../../actions/appActions";
export default function ItemsTable(props) {
  const dispatch = useDispatch();
  const orderInfo = useSelector(state => state.cart.orderInfo);
  function handleShowProduct(id) {
    window.location.href = `/san-pham/${id}`
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
  return (
    <table>
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
          orderInfo.items_in_time.map((v, i) =>
            <tr key={v._id}>
              <td className="product">
                <div className="row">
                  <div className="image">
                    <div className="img-container">
                      <img src={orderInfo.items[i].images[0]} alt=""
                        style={{
                          background: "url(/img/default_product.jpg)",
                          backgroundSize: "contain"
                        }}
                      />
                    </div>
                  </div>
                  <div className="action">
                    <div className="name">
                      {orderInfo.items[i].name}
                    </div>
                    {
                      orderInfo.status.code === "COMPLETED" &&
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
                    <button onClick={() => handleShowProduct(orderInfo.items[i]._id)}>Xem thông tin</button>
                  </div>
                </div>
              </td>
              <td className="prePrice">
                ₫ {formatPrice(v.after_discount_price)}
              </td>
              <td className="number">
                {orderInfo.items_in_time[i].quantity}
              </td>
              <td className="discount">
                ₫ {formatPrice(v.before_discount_price - v.after_discount_price)}
              </td>
              <td className="price">
                ₫ {formatPrice(v.after_discount_price * v.quantity)}
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}