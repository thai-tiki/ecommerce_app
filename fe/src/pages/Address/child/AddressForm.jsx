import { useSelector, useDispatch } from "react-redux"; import Select from "../../../components/Select";
import { hideParentElement } from "../../../helper";
import { appActions as a } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
import { useState } from "react";
import { useEffect } from "react";
export default function AddressForm(props) {
  const { customClass, currentAddress } = props;
  const dispatch = useDispatch();
  const provinces = useSelector(state => state.app.addressData.provinces);
  const districts = useSelector(state => state.app.addressData.districts);
  const wards = useSelector(state => state.app.addressData.wards);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [currentWard, setCurrentWard] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [errMsg, setMessage] = useState("");
  useEffect(() => {
    if (currentAddress) {
      dispatch(a.getDistrictsList(currentAddress.province));
      dispatch(a.getWardsList(currentAddress.district));
      setCurrentWard({
        title: currentAddress.wardName,
        id: currentAddress.ward
      });
      setCurrentProvince({
        title: currentAddress.provinceName,
        id: currentAddress.province
      });
      setCurrentDistrict({
        title: currentAddress.districtName,
        id: currentAddress.district
      });
      setName(currentAddress.name);
      setPhone(currentAddress.phone ? currentAddress.phone : "");
      setEmail(currentAddress.email);
      setDetail(currentAddress.detail);
    } else {
      setCurrentWard(null);
      setCurrentProvince(null);
      setCurrentDistrict(null)
      setName("");
      setPhone("");
      setEmail("");
      setDetail("");
    }
  }, [currentAddress, dispatch])
  function showDetail(e) {
    let currentElement = e.currentTarget;
    let nextElement = currentElement.nextElementSibling;
    let parentElement = currentElement.parentElement;
    if (nextElement.style.maxHeight) {
      nextElement.style.maxHeight = null;
      parentElement.style.zIndex = 2;
    } else {
      nextElement.style.maxHeight = 130 + "px";
      nextElement.style.overflowY = "scroll";
      parentElement.style.zIndex = 10;
    }
  }
  function handleCLose(e) {
    props.handleClose(e);
    setMessage("");
  }
  function handleProvinceSelect(v, e) {
    hideParentElement(e);
    setCurrentProvince(v);
    setCurrentDistrict(null);
    setCurrentWard(null);
    dispatch(a.getDistrictsList(v.id));
  }
  function handleDistrictSelect(v, e) {
    hideParentElement(e);
    setCurrentDistrict(v);
    setCurrentWard(null);
    dispatch(a.getWardsList(v.id));
  }
  function handleWardSelect(v, e) {
    hideParentElement(e);
    setCurrentWard(v);
    console.log(v);
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangePhone(e) {
    setPhone(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangeDetail(e) {
    setDetail(e.target.value);
  }
  function handleSubmit() {
    if (!name || !phone || !email || !detail || !currentProvince || !currentDistrict || !currentWard) {
      if (!currentAddress) {
        setMessage("Vui lòng điền đầy đủ thông tin !");
        return;
      }
    };
    const addressInfo = {
      name,
      address_detail: detail,
      country: 1,
      province: currentProvince.id,
      district: currentDistrict.id,
      wards: currentWard.id,
      phone,
      email,
    };
    if (!currentAddress) {
      dispatch(a.changePopup(c.MESSAGE_POPUP));
      addressInfo.is_default = true;
      props.handleAddAddress(addressInfo);
      return;
    }
    dispatch(a.changePopup(c.MESSAGE_POPUP));
    addressInfo.is_default = currentAddress.isDefault;
    addressInfo.id = currentAddress.id;
    props.handleUpdateAddress(addressInfo);
  }
  return (
    <div className={"form-container " + customClass}>
      <div className="address-form">
        <input type="text" name="name" id="name"
          value={name}
          placeholder="Tên"
          onChange={handleChangeName}
        />
        <input type="number" name="phone" id="phone"
          value={phone}
          placeholder="Số điện thoại"
          onChange={handleChangePhone}
        />
        <input type="text" name="email" id="email"
          value={email}
          placeholder="Email"
          onChange={handleChangeEmail}
        />
        <Select
          placeholder={currentProvince ? currentProvince.title : "Tỉnh/Thành phố"}
          handleSelect={handleProvinceSelect}
          showDetail={showDetail}
          values={provinces.map((v) => {
            return {
              title: v.name,
              id: v.id
            }
          })}
        />
        <Select
          placeholder={currentDistrict ? currentDistrict.title : "Quận/Huyện"}
          handleSelect={handleDistrictSelect}
          showDetail={showDetail}
          values={districts.map((v) => {
            return {
              title: v.name,
              id: v.id
            }
          })}
        />
        <Select
          placeholder={currentWard ? currentWard.title : "Phường/Xã"}
          handleSelect={handleWardSelect}
          showDetail={showDetail}
          values={wards.map((v) => {
            return {
              title: v.name,
              id: v.id
            }
          })}
        />
        <input type="text" name="detail" id="detail"
          value={detail}
          placeholder="Địa chỉ"
          onChange={handleChangeDetail}
        />
        <div className="err-msg">{errMsg}</div>
        <div>
          <button className="save-btn" onClick={handleSubmit}>
            {currentAddress ? "Cập nhật" : "Lưu địa chỉ"}
          </button>
          <button className="cancel-btn" onClick={handleCLose}>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  )
}