import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { voucherActions } from "../../../actions/voucherActions";
import { constants as c } from "../../../constants";
import VoucherCard from "../../../components/VoucherCard";
import LoadingModal from "./LoadingModal";
export default function VoucherPopup(props) {
  const dispatch = useDispatch();
  const vouchers = useSelector(state => state.voucher.list);
  useEffect(() => {
    if (vouchers.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
  }, [])
  return (
    <div className="modal center">
      <div className="voucher-popup">
        <button className="close-btn" onClick={props.handleClose}>
          <i className="fas fa-times"></i>
        </button>
        {
          vouchers.status === c.SUCCESS
            ?
            <div className="vouchers-list">
              {
                vouchers.data.map((v) => <VoucherCard {...v} key={v._id} />)
              }
            </div>
            :
            <LoadingModal />
        }
      </div>
    </div>
  )
}