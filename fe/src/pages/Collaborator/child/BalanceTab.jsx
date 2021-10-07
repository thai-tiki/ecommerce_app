import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import Paginate from "../../../components/Paginate";
export default function BalanceTab(props) {
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <div className="balance-tab">
      <table>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Giá trị</th>
            <th className="detail">Nội dung</th>
            <th className="balance">Số dư</th>
            <th className="mobile"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.history.data.map((v, i) =>
              <tr key={i}>
                <td className="date">
                  {v.created_at.slice(0, 10)}
                </td>
                <td>{formatPrice(v.money)}đ</td>
                <td className="detail">{v.type_name}</td>
                <td className="balance">{formatPrice(v.current_balance)}đ</td>
                <td className="mobile">
                  <button style={{ background: appTheme.color_main_1 }}>Chi tiet</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Paginate totalPage={props.history.last_page} currentPage={props.history.current_page} />
    </div>
  )
}