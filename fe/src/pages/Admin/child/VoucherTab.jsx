import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voucherActions } from "../../../actions/voucherActions";
import { constants as c } from "../../../constants";
import { formatPrice } from "../../../helper";
import NewsAddForm from "./NewsAddForm";
export default function VoucherTab() {
  const dispatch = useDispatch();
  const vouchers = useSelector(state => state.voucher.list);
  const [currentForm, setCurrentForm] = useState("none");
  const forms = {
    "none": <></>,
    "add": <NewsAddForm handleClose={() => setCurrentForm("none")} />
  }
  useEffect(() => {
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
  }, []);
  return (
    <div className="voucher-tab tab">
      <div className="row">
        <div className="vouchers-list">
          <h4>Danh sách khuyến mãi</h4>
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
                    <tr key={v._id} onClick={() => { }}>
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
        <div className="voucher-add">
          <h4>Danh sách khuyến mãi</h4>
          <div>
            <input
              type="text"
              placeholder="Tên khuyến mãi"
              value={""}
              onChange={(e) => { }}
            />
            <input
              type="text"
              placeholder="Mã khuyến mãi"
              value={""}
              onChange={(e) => { }}
            />
            <input
              type="text"
              placeholder="Loại"
              value={""}
              onChange={(e) => { }}
            />
            <input
              type="text"
              placeholder="Giá trị"
              value={""}
              onChange={(e) => { }}
            />
            <div className="row">
              <label htmlFor="end">Ngày hết hạn</label>
              <input
                type="date"
                name="end"
                placeholder="Ngày hết hạn"
                value={""}
                onChange={(e) => { }}
              />
            </div>
            <button>Thêm</button>
          </div>
        </div>
      </div>
      {forms[currentForm]}
    </div>
  )
}