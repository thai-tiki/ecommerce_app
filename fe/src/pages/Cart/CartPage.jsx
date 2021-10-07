import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import CartItem from "./child/CartItem";
import OrderInfo from "./child/OrderInfo";
import AddressPopup from "./child/AddressPopup";
import VoucherPopup from "./child/VoucherPopup";
import { constants as c } from "../../constants";
import { appActions } from "../../actions/appActions";
import PageLoading from "../../components/PageLoading";
import { cartActions } from "../../actions/cartActions";
import { userActions } from "../../actions/userActions";
import { voucherActions } from "../../actions/voucherActions";
function CartPage() {
  const dispatch = useDispatch();
  const [code_voucher, setVoucherCode] = useState("");
  const [is_use_points, setIsUsePoint] = useState(false);
  const [is_use_balance_collaborator, setUseCollaboratorBalance] = useState(false);
  const [customClass, setCustomClass] = useState("");
  const [currentPopup, setCurrentPopup] = useState("");
  const [currentShowDistributeItem, setCurrentShowDistributeItem] = useState("");
  const vouchers = useSelector(state => state.voucher.list);
  const cartStatus = useSelector(state => state.cart.status);
  const cartInfo = useSelector(state => state.cart.cartInfo);
  const userAddress = useSelector(state => state.user.address);
  const shipmentFee = useSelector(state => state.cart.shipmentFee);
  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  const appTheme = useSelector(state => state.app.appTheme);
  useEffect(() => {
    document.title = "Thanh toán";
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.addEventListener("click", function (e) {
      let containers = document.querySelectorAll(".distributes");
      for (let i = 0; i < containers.length; i++) {
        if (containers[i].contains(e.target)) return;
      }
      setCurrentShowDistributeItem("");
    });
    if (cartStatus === c.LOADING) {
      dispatch(cartActions.getCartInfo());
    }
    if (cartStatus === c.FAILURE) {
      window.location.href = "/";
    }
    if (userAddress.status === c.LOADING) {
      dispatch(userActions.getUserAddress());
    }
    if (paymentMethod.status === c.LOADING)
      dispatch(cartActions.getPaymentMethods());
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
    if (userAddress.status === c.SUCCESS && shipmentFee.status === c.LOADING) {
      const defaultAddressArr = userAddress.list.filter((v) => v.is_default);
      let defaultAddress = {};
      if (defaultAddressArr.length > 0) {
        defaultAddress = defaultAddressArr[0];
        dispatch(cartActions.getShipmentFee(defaultAddress.id));
      } else {
        defaultAddress = defaultAddressArr[0];
        dispatch(cartActions.getShipmentFee(-1));
      }
    }
  }, [userAddress]);
  function handleChangeQuantity(product) {
    dispatch(cartActions.changeNumberInCart(product))
  };
  function handleOrder(orderInfo) {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP));
    dispatch(cartActions.order(orderInfo));
  };
  function handleShowPopup(type) {
    setCurrentPopup(type);
    setCustomClass("center");
  };
  function handleClosePopup() {
    setCustomClass("");
  };
  function handleVoucherInput(e) {
    setVoucherCode(e.target.value);
  }
  function handleSelectVoucher(code) {
    setCustomClass("");
    setVoucherCode(code);
    applyDiscount("code_voucher", code)
  }
  function applyDiscount(type, value) {
    let info = {
      code_voucher,
      is_use_points,
      is_use_balance_collaborator
    };
    info[type] = value;
    if (type === "code_voucher" && value === "")
      setVoucherCode("");
    dispatch(cartActions.applyDiscount(info, type));
  }
  function handleChangeCheckBox(type) {
    if (type === "bonus") {
      applyDiscount("is_use_points", !is_use_points);
      setIsUsePoint(!is_use_points);
    }
    if (type === "collaborator") {
      applyDiscount("is_use_balance_collaborator", !is_use_balance_collaborator);
      setUseCollaboratorBalance(!is_use_balance_collaborator)
    }
  }
  return (
    cartStatus === c.LOADING
      ? <PageLoading />
      :
      <React.Fragment>
        <Header />
        {
          cartInfo.line_items.length > 0 ?
            <div className="cart-page">
              <div className="container row">
                <div className="cart-items-list">
                  {
                    cartInfo.line_items.map((v) => v &&
                      <CartItem
                        key={v.id}
                        line_item_id={v.id}
                        item_price={v.item_price}
                        before_discount_price={v.before_discount_price}
                        product={v.product}
                        quantity={v.quantity}
                        changeQuantity={handleChangeQuantity}
                        distributes_selected={v.distributes_selected}
                        isShowDistribute={v.id === currentShowDistributeItem}
                        onShowDistribute={() => setCurrentShowDistributeItem(currentShowDistributeItem ? "" : v.id)}
                      />
                    )
                  }
                </div>
                <OrderInfo
                  cartInfo={cartInfo}
                  code_voucher={code_voucher}
                  is_use_points={is_use_points}
                  userAddress={userAddress.list}
                  shipmentFee={shipmentFee.list}
                  paymentMethod={paymentMethod.list}
                  is_use_balance_collaborator={is_use_balance_collaborator}
                  handleOrder={handleOrder}
                  applyDiscount={applyDiscount}
                  handleShowPopup={handleShowPopup}
                  handleVoucherInput={handleVoucherInput}
                  handleChangeCheckBox={handleChangeCheckBox}
                />
              </div>
              <div className={`modal ${customClass}`}>
                {
                  currentPopup === "address" &&
                  <AddressPopup
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
            : <div className="_1fP0AH _2tKeYb"><div className="_1g-4gk" /><div className="h9wsC4">Giỏ hàng của bạn còn trống!</div><a className="_35zxc9" href="/"><button className="shopee-button-solid" style={{ background: appTheme.color_main_1 }}><span className="_3SCpTT">MUA NGAY</span></button></a></div>
        }
      </React.Fragment >
  )
}
export default CartPage