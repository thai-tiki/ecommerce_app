import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Select from "../../../components/Select";
import Paginate from "../../../components/Paginate";
import { collaboratorActions as a } from "../../../actions/collaboratorActions";
import { formatPrice, hideParentElement, showNextElement } from "../../../helper";
export default function ReceiptTab(props) {
  const dispatch = useDispatch();
  const appTheme = useSelector(state => state.app.appTheme);
  const [currentStatus, setCurrentStatus] = useState("Trạng thái");
  const [query, setQuery] = useState({});
  function handleChangeQueryString(q) {
    let queryKeys = [...Object.keys(q)];
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${q[v]}&`, "?");
    console.log(queryStr);
    dispatch(a.getSharedOrder(queryStr));
  }
  function handleSort(option, e) {
    let newQuery = { ...query };
    let keys = [...Object.keys(option)];
    hideParentElement(e);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "title")
        newQuery[keys[i]] = option[keys[i]];
      else {
        if (currentStatus === option.title)
          return;
        if (option.title === "Tất cả")
          newQuery = {};
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
  return (
    <div className="receipt-tab">
      <div className="sort-option row" style={{ justifyContent: "right", marginBottom: "1em" }}>
        <Select
          placeholder={currentStatus}
          handleSelect={handleSort}
          showDetail={(e) => showNextElement(e, 200)}
          values={[
            {
              title: "Tất cả"
            },
            {
              title: "Chưa thanh toán",
              field_by: "payment_status_code",
              field_by_value: "UNPAID",
            },
            {
              title: "Chờ xử lý",
              field_by: "payment_status_code",
              field_by_value: "WAITING_FOR_PROGRESSING",
            },
            {
              title: "Đã thanh toán",
              field_by: "payment_status_code",
              field_by_value: "PAID",
            },
            {
              title: "Đã thanh toán một phần",
              field_by: "payment_status_code",
              field_by_value: "PARTIALLY_PAID",
            },
            {
              title: "Đã hủy",
              field_by: "payment_status_code",
              field_by_value: "CANCELLED",
            },
            {
              title: "Đã hoàn tiền",
              field_by: "payment_status_code",
              field_by_value: "REFUNDS",
            }
          ]}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="date">Ngày đặt</th>
            <th className="value">Giá trị</th>
            <th>Trạng thái</th>
            <th>Hoa hồng</th>
            <th className="mobile"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.orders.data.map((v, i) => v.total_after_discount > 0 &&
              <tr key={i}>
                <td className="date">
                  {v.created_at.slice(0, 10)}
                </td>
                <td className="value">{formatPrice(v.total_after_discount)}đ</td>
                <td>{v.payment_status_name}</td>
                <td>{formatPrice(v.share_collaborator)}đ</td>
                <td className="mobile">
                  <button style={{ background: appTheme.color_main_1 }}>Chi tiết</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Paginate
        handlePageSelect={handlePageSelect}
        totalPage={props.orders.last_page}
        currentPage={props.orders.current_page} />
    </div >
  )
}