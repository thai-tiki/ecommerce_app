import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAddressString } from "../../../helper";
export default function UserAddress(props) {
  const location = useSelector(state => state.app.location.data);
  const listAddress = useSelector(state => state.user.address.list);
  const defaultAddressArr = listAddress.filter((v) => v.is_default);
  let defaultAddress = {};
  let addressText = "";
  if (defaultAddressArr.length > 0) {
    defaultAddress = defaultAddressArr[0];
    let { province, district, ward, detail } = defaultAddress;
    addressText = getAddressString(location, province, district, ward, detail)
  }
  useEffect(() => {
    props.handleChange("address", {
      location: addressText,
      phone: defaultAddress.phone,
      name: defaultAddress.name
    })
  }, [listAddress])
  return (
    <div className="personal-info">
      <h5>Giao tới</h5>
      {
        defaultAddressArr.length > 0 ?
          (
            <>
              <button
                onClick={() => props.handleShowPopup("address")}
                className="show-modal-btn"
              >
                Thay đổi
              </button>
              <div className="row">
                <label>{defaultAddress.name}</label>
                <label style={{ marginLeft: "2em" }}>
                  {defaultAddress.phone}
                </label>
              </div>
              <label>
                {addressText}
              </label>
            </>
          )
          :
          (
            <a href="/dia-chi">Thêm địa chỉ</a>
          )
      }
    </div>
  )
}