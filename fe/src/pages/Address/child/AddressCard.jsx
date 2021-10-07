import { useSelector } from "react-redux";
export default function AddressCard(props) {
  const {
    id,
    isDefault,
    provinceName,
    districtName,
    wardName,
    name,
    detail,
    handleDelete
  } = props;
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <div className="address-card" id={id}>
      {isDefault ?
        <label>Mặc định</label> :
        <label onClick={() => handleDelete(id)} style={{ cursor: "pointer" }}>Xóa</label>
      }
      <span>
        {name}
      </span>
      <div>
        {`Địa chỉ: ${detail}, ${wardName}, ${districtName}, ${provinceName}`}
      </div>
      {
        !isDefault &&
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