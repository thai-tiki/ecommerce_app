import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../actions/userActions";
import { getAddressString } from "../../../helper";
export default function AddressCard(props) {
  const {
    name,
    ward,
    phone,
    index,
    detail,
    address,
    province,
    district,
    is_default,
  } = props;
  const dispatch = useDispatch();
  function setDefault() {
    dispatch(userActions.updateUserAddress({
      ...address,
      is_default: true
    }, index));
  }
  const location = useSelector(state => state.app.location.data);
  return (
    <div className="address-card">
      {
        is_default &&
        <label>Mặc định</label>
      }
      <span>
        {name}
      </span>
      <span style={{ fontSize: "14px", marginTop: "8px" }}>
        {`SĐT: ${phone}`}
      </span>
      <div>
        {`Địa chỉ: ${getAddressString(location, province, district, ward, detail)}`}
      </div>
      {
        !is_default &&
        <button
          className="set-default-btn"
          onClick={setDefault}
        >
          Giao đến địa chỉ này
        </button>
      }
    </div>
  )
}