import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./child/OrderCard";
import { formatPrice } from "../../helper";
import Select from "../../components/Select";
import Header from "../../components/Header";
import Paginate from "../../components/Paginate";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading";
import { cartActions as a } from "../../actions/cartActions";
import { showNextElement, hideParentElement } from "../../helper";
import { cartActions } from "../../actions/cartActions";
function OrdersListPage() {
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [query, setQuery] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const ordersList = useSelector((state) => state.cart.ordersList);
  const appTheme = useSelector((state) => state.app.appTheme);
  useEffect(() => {
    document.title = "Danh sách đơn hàng";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (ordersList.status === c.LOADING) {
      dispatch(a.getOrdersList(""));
    }
  });
  function handleShowInfo(id) {
    window.location.href = `/don-hang/${id}`;
  }
  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }
  function handleChangeQueryString(q) {
    let queryKeys = [...Object.keys(q)];
    console.log(queryKeys);
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${q[v]}&`, "?");
    console.log(queryStr);
    dispatch(a.getOrdersList(queryStr));
  }
  function handleRebuy(e, productsList) {
    e.stopPropagation();
    productsList.map((v) => {
      dispatch(
        cartActions.addCart(
          {
            product_id: v.id,
            quantity: v.quantity,
            distributes: v.distributes_selected,
          },
          true
        )
      );
      return null
    });
  }
  function handleSort(option, e) {
    let newQuery = { ...query };
    let keys = [...Object.keys(option)];
    hideParentElement(e);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title") newQuery[keys[i]] = option[keys[i]];
      else {
        if (currentStatus === option.title) return;
        if (option.title === "Tất cả") newQuery = {};
        setCurrentStatus(option.title);
        newQuery.page = 1;
      }
    }
    setQuery(newQuery);
    handleChangeQueryString(newQuery);
  }
  function handlePageSelect(page) {
    let cloneQuery = { ...query, ...page };
    handleChangeQueryString(cloneQuery);
  }
  function handleSearch() {
    if (searchValue !== "") handleChangeQueryString({ search: searchValue });
  }
  function handleEnter(e) {
    if (e.key === "Enter") handleSearch();
  }
  function openPaymentDialog(e, order) {
    e.stopPropagation();
    dispatch({
      type: c.CHANGE_POPUP,
      popupType: c.ORDER_POPUP,
      orderPopupTitle: {
        title: "Thanh toán!",
        subTitle:
          "Hãy thanh toán ngay hoặc thay đổi hình thức thanh toán.",
      },
      paymentMethod: {
        payment_method_name: order.payment_method_name,
        payment_method_id: order.payment_method_id,
        order_code: order.order_code,
      },
    });
  }
  return (
    <React.Fragment>
      <Header />
      {ordersList.status === c.LOADING ? (
        <PageLoading />
      ) : (
        <div className="orders-list-page container">
          <div className="sort-option row" style={{ zIndex: "3" }}>
            <div className="search-bar-order" onKeyDown={handleEnter}>
              <input
                className="input-order"
                type="text"
                placeholder="Mã đơn hàng..."
                value={searchValue}
                onChange={handleInputChange}
              />
              <button
                className="button-order"
                onClick={() => {
                  handleChangeQueryString(query);
                }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
            <Select
              placeholder={currentStatus}
              handleSelect={handleSort}
              showDetail={(e) => showNextElement(e, 200)}
              values={[
                {
                  title: "Tất cả",
                },
                {
                  title: "Chờ xử lý",
                  field_by: "order_status_code",
                  field_by_value: "WAITING_FOR_PROGRESSING",
                },
                {
                  title: "Đã hoàn thành",
                  field_by: "order_status_code",
                  field_by_value: "COMPLETED",
                },
                {
                  title: "Đang chuẩn bị hàng",
                  field_by: "order_status_code",
                  field_by_value: "PACKING",
                },
                {
                  title: "Hết hàng",
                  field_by: "order_status_code",
                  field_by_value: "OUT_OF_STOCK",
                },
                {
                  title: "Shop đã huỷ",
                  field_by: "order_status_code",
                  field_by_value: "USER_CANCELLED",
                },
                {
                  title: "Khách đã hủy",
                  field_by: "order_status_code",
                  field_by_value: "CUSTOMER_CANCELLED",
                },
                {
                  title: "Đang giao hàng",
                  field_by: "order_status_code",
                  field_by_value: "SHIPPING",
                },
                {
                  title: "Lỗi giao hàng",
                  field_by: "order_status_code",
                  field_by_value: "DELIVERY_ERROR",
                },
                {
                  title: "Chờ trả hàng",
                  field_by: "order_status_code",
                  field_by_value: "CUSTOMER_RETURNING",
                },
                {
                  title: "Đã trả hàng",
                  field_by: "order_status_code",
                  field_by_value: "CUSTOMER_HAS_RETURNS",
                },
              ]}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th className="order-id">Mã đơn hàng</th>
                <th className="date">Thời gian</th>
                <th className="n-product">Sản phẩm</th>
                <th className="total">Tổng tiền</th>
                <th className="status">T.t đơn hàng</th>
                <th className="status">T.t thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.data.map(
                (v, i) =>
                  v.line_items_at_time.length > 0 && (
                    <tr key={i} onClick={() => handleShowInfo(v.order_code)}>
                      <td className="order-id" style={{ minWidth: "160px" }}>
                        {v.order_code}
                      </td>
                      <td className="date">{v.created_at.split(" ")[0]}</td>
                      <td className="n-product">
                        <div>{v.line_items_at_time[0].name}</div>
                        <span>
                          {v.line_items_at_time.length > 1
                            ? `0${v.line_items_at_time.length - 1
                            } sản phẩm khác`
                            : null}
                        </span>
                      </td>
                      <td className="total">₫ {formatPrice(v.total_final)}</td>
                      <td className="status">{v.order_status_name}</td>
                      <td className="status">
                        {v.payment_status_name}
                        <br />
                        {
                          v.payment_status_code === "UNPAID" &&
                          ["WAITING_FOR_PROGRESSING", "PACKING"].includes(v.order_status_code) &&
                          <button
                            onClick={(e) => {
                              openPaymentDialog(e, v);
                            }}
                            style={{
                              padding: "6px 8px",
                              borderRadius: "0.25em",
                              color: "white",
                              marginTop: "0.5em",
                              background: appTheme.color_main_1
                            }}
                          >Thanh toán</button>
                        }
                        {
                          v.order_status_code === "COMPLETED" &&
                          (
                            !v.reviewed ?
                              <button
                                onClick={(e) => {
                                  handleRebuy(e, v.line_items_at_time);
                                }}
                                style={{
                                  padding: "6px 8px",
                                  borderRadius: "0.25em",
                                  color: "white",
                                  marginTop: "0.5em",
                                  background: appTheme.color_main_1
                                }}
                              >Đánh giá</button>
                              :
                              <button
                                onClick={() => {
                                  openPaymentDialog(v);
                                }}
                                style={{
                                  padding: "6px 8px",
                                  borderRadius: "0.25em",
                                  color: "white",
                                  marginTop: "0.5em",
                                  background: appTheme.color_main_1
                                }}
                              >Mua lại</button>
                          )
                        }
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <div className="mobile">
            {ordersList.data.map(
              (v, i) =>
                v.line_items_at_time.length > 0 && (
                  <OrderCard
                    statusCode={v.order_status_code}
                    onClick={handleShowInfo}
                    orderCode={v.order_code}
                    key={i}
                    status={v.order_status_name}
                    image={v.line_items_at_time[0].image_url}
                    name={v.line_items_at_time[0].name}
                    nItems={v.line_items_at_time.length}
                    total={v.total_final}
                  />
                )
            )}
          </div>
          <Paginate
            handlePageSelect={handlePageSelect}
            currentPage={ordersList.current_page}
            totalPage={ordersList.last_page}
          />
        </div>
      )}
    </React.Fragment>
  );
}
export default OrdersListPage;
