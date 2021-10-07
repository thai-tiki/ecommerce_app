import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../actions/userActions";
export default function AddressCard(props) {
  const {
    id,
    name,
    detail,
    address,
    wardName,
    isDefault,
    provinceName,
    districtName,
  } = props;
  const dispatch = useDispatch();
  function setDefault() {
    dispatch(userActions.setAddressDefault({
      ...address,
      is_default: true
    }));
  }
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <div className="address-card" id={id} style={{ border: `dashed 2px ${appTheme.color_main_1}` }}>
      {
        isDefault &&
        <label style={{ color: appTheme.color_main_1 }}>Mặc định</label>
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
          onClick={setDefault}
          style={{ background: appTheme.color_main_1 }}>
          Giao đến địa chỉ này
        </button>
      }
    </div>
  )
}