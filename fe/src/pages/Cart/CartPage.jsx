import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./child/CartItem";
import PriceInfo from "./child/PriceInfo";
import NoteInput from "./child/NoteInput";
import Header from "../../components/Header";
import UserAddress from "./child/UserAddress";
import VoucherInput from "./child/VoucherInput";
import AddressPopup from "./child/AddressPopup";
import VoucherPopup from "./child/VoucherPopup";
import PaymentMethod from "./child/PaymentMethod";
import ShipmentMethod from "./child/ShipmentMethod";
import PageLoading from "../../components/PageLoading";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import { cartActions } from "../../actions/cartActions";
import { userActions } from "../../actions/userActions";
import { voucherActions } from "../../actions/voucherActions";
function CartPage() {
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState({});
  const [customClass, setCustomClass] = useState("");
  const [currentPopup, setCurrentPopup] = useState("");
  const vouchers = useSelector(state => state.voucher.list);
  const cartStatus = useSelector(state => state.cart.status);
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const userAddress = useSelector(state => state.user.address);
  const shipmentMethod = useSelector(state => state.cart.shipmentMethod);
  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  useEffect(() => {
    document.title = "Thanh toán";
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (cartStatus === c.LOADING)
      dispatch(cartActions.getCartInfo());
    if (cartStatus === c.FAILURE)
      window.location.href = "/";
    if (userAddress.status === c.LOADING)
      dispatch(userActions.getUserAddress());
    if (paymentMethod.status === c.LOADING)
      dispatch(cartActions.getPaymentMethods());
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
    if (shipmentMethod.status === c.LOADING)
      dispatch(cartActions.getShipmentMethods());
  }, []);
  function handleChangeQuantity(product) {
    //dispatch(cartActions.changeNumberInCart(product))
  };
  function handleOrder() {
    console.log(orderInfo);
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(cartActions.order(orderInfo));
  };
  function handleSetOrderInfo(name, value) {
    let tmp = { ...orderInfo };
    tmp[name] = value;
    setOrderInfo(tmp);
  }
  function handleShowPopup(type) {
    setCurrentPopup(type);
    setCustomClass("center");
  };
  function handleClosePopup() {
    setCustomClass("");
  };
  function handleSelectVoucher(code) {
    setCustomClass("");
    //setVoucherCode(code);
    //applyDiscount("code_voucher", code)
  }
  return (
    cartStatus === c.LOADING
      ? <PageLoading />
      :
      <React.Fragment>
        <Header />
        <div className="cart-page">
          <div className="container row">
            <div className="cart-items-list">
              {
                cartInfo.items_in_time.map((v, i) => v &&
                  <CartItem
                    {...v}
                    key={v._id}
                    product={cartInfo.items[i]}
                    changeQuantity={handleChangeQuantity}
                  />
                )
              }
            </div>
            <div className="order-info">
              <div>
                <UserAddress
                  handleChange={handleSetOrderInfo}
                  handleShowPopup={handleShowPopup}
                />
                <VoucherInput
                  handleChange={handleSetOrderInfo}
                  handleShowPopup={handleShowPopup}
                />
                <NoteInput
                  note={orderInfo.note}
                  handleChange={handleSetOrderInfo}
                />
              </div>
              <div>
                <PaymentMethod
                  selected={orderInfo.payment_method}
                  handleChange={handleSetOrderInfo}
                />
                <ShipmentMethod
                  selected={orderInfo.shipment_method}
                  handleChange={handleSetOrderInfo}
                />
                <PriceInfo handleOrder={handleOrder} />
              </div>
            </div>
          </div>
          <div className={`modal ${customClass}`}>
            {
              currentPopup === "address" &&
              <AddressPopup
                handleShowPopup={handleShowPopup}
                handleClosePopup={handleClosePopup}
                userAddress={userAddress.list}
              />
            }
            {
              currentPopup === "voucher" &&
              <VoucherPopup
                vouchers={vouchers.data}
                handleClosePopup={handleClosePopup}
                handleSelectVoucher={handleSelectVoucher}
              />
            }
          </div>
        </div>
      </React.Fragment >
  )
}
export default CartPage