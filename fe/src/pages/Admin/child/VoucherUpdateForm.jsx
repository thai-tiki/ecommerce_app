import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { appActions } from "../../../actions/appActions";
import { voucherActions } from "../../../actions/voucherActions";
import { constants as c } from "../../../constants";
export default function VoucherUpdateForm(props) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ ...props.voucher });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  }
  function handleSubmit() {
    let voucherInfo = { ...info };
    let arr = info.end.split("-");
    let expirationDate = `${arr[2]}-${arr[1]}-${arr[0]}`;
    voucherInfo.end = expirationDate;
    voucherInfo.value = parseInt(info.value)
    console.log(voucherInfo);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(voucherActions.updateVoucher(voucherInfo));
  }
  useEffect(() => {
    console.log("1")
    setInfo({ ...props.voucher });
  }, [props])
  return (
    <div className="voucher-form">
      <div style={{ display: "flex" }}>
        <h4>Thông tin mã giảm giá</h4>
        <button
          style={{ margin: 0 }}
          className="add-btn"
          onClick={() => props.onFormChange("add")}>
          Thêm mới <i className="fas fa-plus"></i>
        </button>
      </div>
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
          type="text"
          name="end"
          value={info.end}
          placeholder={info.end}
          onFocus={e => e.target.type = "date"}
          onBlur={e => e.target.type = "text"}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Cập nhật</button>
      </div>
    </div>
  )
}