import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voucherActions } from "../../../actions/voucherActions";
import { constants as c } from "../../../constants";
import { formatPrice } from "../../../helper";
import VoucherAddForm from "./VoucherAddForm";
import VoucherUpdateForm from "./VoucherUpdateForm";
export default function VoucherTab() {
  const dispatch = useDispatch();
  const vouchers = useSelector(state => state.voucher.list);
  const [currentForm, setCurrentForm] = useState("add");
  const [currentVoucher, setCurrentVoucher] = useState({});
  const forms = {
    "add": <VoucherAddForm />,
    "update": <VoucherUpdateForm
      voucher={currentVoucher}
      onFormChange={(f) => setCurrentForm(f)}
    />
  }
  useEffect(() => {
    window.location.hash = "voucher";
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
  }, []);
  return (
    <div className="voucher-tab tab">
      <div className="row">
        <div className="vouchers-list">
          <h4>Danh sách mã giảm giá</h4>
          <div className="table-fixed">
            <table>
              <thead>
                <tr>
                  <th className="id">No.</th>
                  <th className="name">Tên</th>
                  <th>Mã</th>
                  <th>Giá trị</th>
                  <th>HSD</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {
                  vouchers.data.map((v, i) =>
                    <tr
                      key={v._id}
                      onClick={
                        () => {
                          setCurrentVoucher(v);
                          setCurrentForm("update")
                        }
                      }
                    >
                      <td className="id" style={{ width: "45px" }}>{i + 1}</td>
                      <td className="name" style={{ width: "130px" }}>{v.name}</td>
                      <td style={{ width: "140px" }}>{v.code}</td>
                      <td style={{ width: "120px" }}>
                        {
                          v.type === c.VALUE_DISCOUNT
                            ? `${formatPrice(v.value)} ₫`
                            : `${v.value}%`
                        }
                      </td>
                      <td style={{ width: "130px" }}>{v.end}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        {forms[currentForm]}
      </div>
    </div>
  )
}