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
    if (userAddress.status === c.LOADING)
      dispatch(userActions.getUserAddress());
  }, []);
  function handleShowForm(info, index) {
    setFormClass("active");
    if (info) {
      setCurrentAddress({ ...info, index });
      return;
    }
    setCurrentAddress(null);
  };
  function handleCloseForm() {
    setFormClass("");
  }
  function handleAddAddress(info) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.addUserAddress(info));
  }
  function handleUpdateAddress(info, index) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.updateUserAddress(info, index));
  }
  function handleDeleteAddress(id) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.deleteUserAddress(id));
  }
  function setDefault(info, index) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    dispatch(userActions.updateUserAddress({
      ...info,
      is_default: true
    }, index));
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
                  index={i}
                  {...v}
                  handleEdit={() => handleShowForm(v, i)}
                  handleDelete={handleDeleteAddress}
                  setDefault={() => setDefault(v, i)}
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