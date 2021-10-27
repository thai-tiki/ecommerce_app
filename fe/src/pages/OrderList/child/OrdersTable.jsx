import { formatPrice } from "../../../helper";
export default function OrdersTable(props) {
  function handleShowInfo(id) {
    window.location.href = `/don-hang/${id}`;
  }
  return (
    <table>
      <thead>
        <tr>
          <th className="order-id">Mã đơn hàng</th>
          <th className="date">Thời gian</th>
          <th className="n-product">Sản phẩm</th>
          <th className="total">Tổng tiền</th>
          <th className="status">T.t đơn hàng</th>
        </tr>
      </thead>
      <tbody>
        {
          props.orders.map(
            (v, i) =>
              v.items.length > 0 && (
                <tr key={i} onClick={() => handleShowInfo(v._id)}>
                  <td className="order-id" style={{ minWidth: "160px" }}>
                    {v._id}
                  </td>
                  <td className="date">{v.date}</td>
                  <td className="n-product">
                    <div>
                      {
                        v.items[0].name
                          ? v.items[0].name
                          : ""
                      }
                    </div>
                    {
                      v.items.length > 1 &&
                      <span>
                        {`0${v.items.length - 1} sản phẩm khác`}
                      </span>
                    }
                  </td>
                  <td className="total">
                    ₫ {formatPrice(v.total_before_discount)}
                  </td>
                  <td className="status">
                    {v.status.name}
                  </td>
                </tr>
              )
          )
        }
      </tbody>
    </table>
  )
}