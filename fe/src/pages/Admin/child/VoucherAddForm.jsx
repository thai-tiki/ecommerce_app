import { useState } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { voucherActions } from "../../../actions/voucherActions";
import { constants as c } from "../../../constants";
export default function VoucherAddForm(props) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  }
  function validate(info) {
    let { name, type, value, code, end } = info;
    if (!name || !type || !value || !code || !end)
      return "Vui lòng nhập đầy đủ thông tin!";
    if (type === c.PERCENT_DISCOUNT && value > 100)
      return "Giá trị giảm giá không phù hợp!";
    return "";
  }
  function handleSubmit() {
    let voucherInfo = { ...info };
    let arr = info.end ? info.end.split("-") : [];
    let expirationDate = `${arr[2]}-${arr[1]}-${arr[0]}`;
    voucherInfo.end = expirationDate;
    voucherInfo.value = parseInt(info.value)
    console.log(voucherInfo);
    let msg = validate(info);
    if (msg) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, msg));
      return;
    }
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(voucherActions.addVoucher(voucherInfo));
  }
  return (
    <div className="voucher-form">
      <h4>Khuyến mãi mới</h4>
      <div>
        <input
          type="text"
          name="name"
          value={info.name ? info.name : ""}
          placeholder="Tên khuyến mãi"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="code"
          value={info.code ? info.code : ""}
          placeholder="Mã khuyến mãi"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="value"
          value={info.value ? info.value : ""}
          placeholder="Giá trị"
          onChange={handleInputChange}
        />
        <div className="row">
          <label htmlFor={c.VALUE_DISCOUNT}>Loại:</label>
          <div>
            <div>
              <input
                name="type"
                type="checkbox"
                id={c.VALUE_DISCOUNT}
                value={c.VALUE_DISCOUNT}
                checked={info.type === c.VALUE_DISCOUNT}
                onChange={handleInputChange}
              />
              <label
                htmlFor={c.VALUE_DISCOUNT}
              >
                Giảm giá trực tiếp
              </label>
            </div>
            <div>
              <input
                name="type"
                type="checkbox"
                id={c.PERCENT_DISCOUNT}
                value={c.PERCENT_DISCOUNT}
                checked={info.type === c.PERCENT_DISCOUNT}
                onChange={handleInputChange}
              />
              <label
                htmlFor={c.PERCENT_DISCOUNT}
              >
                Giảm giá theo phần trăm
              </label>
            </div>
          </div>
        </div>
        <label htmlFor="end">Ngày hết hạn:</label>
        <input
          type="date"
          name="end"
          value={info.end}
          placeholder="Ngày hết hạn"
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Thêm</button>
      </div>
    </div>
  )
}