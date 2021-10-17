import { useSelector } from "react-redux";
import Select from "../../../components/Select";
import { hideParentElement } from "../../../helper";
import { useState } from "react";
import { useEffect } from "react";
export default function AddressForm(props) {
  const { customClass, currentAddress } = props;
  const location = useSelector(state => state.app.location.data);
  const [currentWard, setCurrentWard] = useState(null);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(0);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [errMsg, setMessage] = useState("");
  useEffect(() => {
    if (currentAddress) {
      setCurrentProvince({
        title: location[currentAddress.province].name
      });
      setCurrentDistrict({
        title: location[currentAddress.province]
          .sub[currentAddress.district]
          .name
      });
      setCurrentWard({
        title: location[currentAddress.province]
          .sub[currentAddress.district]
          .sub[currentAddress.ward]
          .name
      });
      setSelectedProvince(currentAddress.province);
      setSelectedDistrict(currentAddress.district);
      setSelectedWard(currentAddress.ward);
      setName(currentAddress.name);
      setPhone(currentAddress.phone);
      setEmail(currentAddress.email);
      setDetail(currentAddress.detail);
    } else {
      setName("");
      setPhone("");
      setEmail("");
      setDetail("");
      setCurrentDistrict(null);
      setCurrentProvince(null);
      setCurrentWard(null);
    }
  }, [currentAddress])
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
    setSelectedProvince(v.index);
    setCurrentDistrict(null);
    setSelectedDistrict(0);
    setCurrentWard(null);
    setSelectedWard(0);
  }
  function handleDistrictSelect(v, e) {
    hideParentElement(e);
    setCurrentDistrict(v);
    setSelectedDistrict(v.index);
    setCurrentWard(null);
    setSelectedWard(0);
  }
  function handleWardSelect(v, e) {
    hideParentElement(e);
    setCurrentWard(v);
    setSelectedWard(v.index);
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
      phone,
      email,
      detail,
      ward: selectedWard,
      province: selectedProvince,
      district: selectedDistrict,
    };
    if (!currentAddress) {
      addressInfo.is_default = true;
      props.handleAddAddress(addressInfo);
      return;
    }
    addressInfo.is_default = currentAddress.is_default;
    props.handleUpdateAddress(addressInfo, currentAddress.index);
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
          values={location.map((v, i) => {
            return {
              title: v.name,
              id: v.id,
              index: i,
              sub: v.sub
            }
          })}
        />
        <Select
          placeholder={currentDistrict ? currentDistrict.title : "Quận/Huyện"}
          handleSelect={handleDistrictSelect}
          showDetail={showDetail}
          values={
            location[selectedProvince]
              .sub.map((v, i) => {
                return {
                  title: v.name,
                  id: v.id,
                  index: i,
                  sub: v.sub
                }
              })}
        />
        <Select
          placeholder={currentWard ? currentWard.title : "Phường/Xã"}
          handleSelect={handleWardSelect}
          showDetail={showDetail}
          values={
            location[selectedProvince]
              .sub[selectedDistrict]
              .sub.map((v, i) => {
                return {
                  title: v.name,
                  id: v.id,
                  index: i
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