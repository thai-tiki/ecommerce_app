import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import Paginate from "../../../components/Paginate";
export default function BonusTab(props) {
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <div className="receipt-tab">
      <table>
        <thead>
          <tr>
            <th className="date">Tháng</th>
            <th className="value">Doanh số</th>
            <th>Tiền thưởng</th>
            <th>Nhận</th>
            <th>Trạng thái</th>
            <th className="mobile"></th>
          </tr>
        </thead>
        <tbody>
          {
            props.bonus.data.map((v, i) =>
              <tr key={i}>
                <td className="date">
                  {v.month}/{v.year}
                </td>
                <td className="value">{formatPrice(v.total_final)}đ</td>
                <td className="value">{formatPrice(v.share_collaborator)}đ</td>
                <td className="value">{formatPrice(v.money_bonus_rewarded)}đ</td>
                <td style={{ color: appTheme.color_main_1 }}>{v.awarded === true ? "Đã nhận" : ""}</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Paginate totalPage={props.bonus.last_page} currentPage={props.bonus.current_page} />
    </div >
  )
}