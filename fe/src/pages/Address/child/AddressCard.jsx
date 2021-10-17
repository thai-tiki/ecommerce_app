import { useSelector } from "react-redux";
export default function AddressCard(props) {
  const {
    ward,
    name,
    phone,
    index,
    detail,
    district,
    province,
    is_default,
    handleDelete
  } = props;
  const appTheme = useSelector(state => state.app.appTheme);
  const location = useSelector(state => state.app.location.data);
  let provinceName = location[province].name;
  let districtName = location[province].sub[district].name;
  let wardName = location[province].sub[district].sub[ward].name;
  return (
    <div className="address-card" id={index}>
      {is_default ?
        <label>Mặc định</label> :
        <label onClick={() => handleDelete(index)} style={{ cursor: "pointer" }}>Xóa</label>
      }
      <span>
        {name}
      </span>
      <span style={{ fontSize: "14px", marginTop: "8px" }}>
        SĐT: {phone}
      </span>
      <div>
        {`Địa chỉ: ${detail}, ${wardName}, ${districtName}, ${provinceName}`}
      </div>
      {
        !is_default &&
        <button
          className="set-default-btn"
          style={{ background: appTheme.color_main_1 }}
          onClick={props.setDefault}>
          Đặt làm mặc định
        </button>
      }
      <button className="edit-btn" onClick={() => props.handleEdit(props)}>
        Sửa
      </button>
    </div>
  )
}