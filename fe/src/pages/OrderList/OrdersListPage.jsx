import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants as c } from "../../constants";
import { cartActions as a } from "../../actions/cartActions";
import { showNextElement } from "../../helper";
import OrderCard from "./child/OrderCard";
import Select from "../../components/Select";
import Header from "../../components/Header";
import OrdersTable from "./child/OrdersTable";
import Paginate from "../../components/Paginate";
import PageLoading from "../../components/PageLoading";
function OrdersListPage() {
  const dispatch = useDispatch();
  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [query, setQuery] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const ordersList = useSelector((state) => state.cart.ordersList);
  useEffect(() => {
    document.title = "Danh sách đơn hàng";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (ordersList.status === c.LOADING) {
      dispatch(a.getOrdersList(""));
    }
  }, []);
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
  function handleSort(option, e) {
    let newQuery = { ...query };
    let keys = [...Object.keys(option)];
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
  return (
    <React.Fragment>
      <Header />
      {
        ordersList.status === c.LOADING ?
          (
            <PageLoading />
          )
          :
          (
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
                  showDetail={(e) => showNextElement(e)}
                  values={
                    c.ORDER_STATUS.map(v => {
                      return { title: v.name, ...v }
                    })
                  }
                />
              </div>
              <OrdersTable orders={ordersList.list} />
              <div className="mobile">
                {ordersList.list.map(
                  (v, i) =>
                    v.items.length > 0 && (
                      <OrderCard
                        key={i}
                        {...v}
                      />
                    )
                )}
              </div>
              <Paginate
                handlePageSelect={handlePageSelect}
                currentPage={ordersList.currentPage}
                totalPage={ordersList.totalPage}
              />
            </div>
          )}
    </React.Fragment>
  );
}
export default OrdersListPage;
