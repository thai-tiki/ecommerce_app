import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./child/AddressCard";
import AddressForm from "./child/AddressForm";
import Header from "../../components/Header";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { userActions } from "../../actions/userActions";
function AddressPage() {
  const myForm = useRef(null);
  const dispatch = useDispatch();
  const [formClass, setFormClass] = useState("");
  const [currentAddress, setCurrentAddress] = useState(null);
  const userAddress = useSelector(state => state.user.address);
  useEffect(() => {
    document.title = "Địa chỉ nhận hàng";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    if (userAddress.status === c.LOADING) {
      dispatch(userActions.getUserAddress());
    }
    if (userAddress.status === c.FAILURE) {
      window.location.href = "/";
      console.log("fail");
    }
  });
  function handleShowForm(info) {
    if (info && (!currentAddress || currentAddress.id !== info.id)) {
      setCurrentAddress(info);
    }
    if (!info) {
      setCurrentAddress(null);
    }
    setFormClass("active");
  };
  function handleCloseForm() {
    setFormClass("");
  }
  function handleAddAddress(info) {
    console.log(info);
    dispatch(userActions.addUserAddress(info));
  }
  function handleUpdateAddress(info) {
    console.log(info);
    dispatch(userActions.updateUserAddress(info));
  }
  function handleDeleteAddress(id) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(userActions.deleteUserAddress(id));
  }
  function setDefault(index) {
    dispatch(userActions.setAddressDefault({
      ...userAddress.list[index],
      is_default: true
    }));
  }
  return (
    <React.Fragment>
      <Header />
      {
        userAddress.status === c.SUCCESS ?
          <div className="address-page container">
            {
              userAddress.list.map((v, i) =>
                <AddressCard
                  key={i}
                  id={v.id}
                  name={v.name}
                  email={v.email}
                  detail={v.address_detail}
                  handleEdit={handleShowForm}
                  isDefault={v.is_default}
                  province={v.province}
                  provinceName={v.province_name}
                  district={v.district}
                  districtName={v.district_name}
                  ward={v.wards}
                  wardName={v.wards_name}
                  phone={v.phone}
                  handleDelete={handleDeleteAddress}
                  setDefault={() => setDefault(i)}
                />
              )
            }
            <div style={{ fontSize: "14px" }}>
              Giao đến địa chỉ khác ?
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => handleShowForm(null)}>
                Thêm địa chỉ
              </span>
            </div>
            <div ref={myForm}>
              <AddressForm
                currentAddress={currentAddress}
                customClass={formClass}
                handleClose={handleCloseForm}
                handleAddAddress={handleAddAddress}
                handleUpdateAddress={handleUpdateAddress}
              />
            </div>
          </div>
          : <PageLoading />
      }
    </React.Fragment>
  )
}
export default AddressPage