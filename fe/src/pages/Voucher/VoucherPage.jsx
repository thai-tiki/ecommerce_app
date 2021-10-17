import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import VoucherCard from "./child/VoucherCard";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading";
import { voucherActions } from "../../actions/voucherActions";
import EmptyVoucher from "../../components/Empty/EmptyVoucher";
function VoucherPage() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.voucher.list);
  useEffect(() => {
    document.title = "Mã giảm giá";
    if (list.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
    console.log(list)
  })
  return (
    <React.Fragment>
      <Header />
      {list.status === c.LOADING ? <PageLoading /> :
        list.data.length === 0 ? <EmptyVoucher /> : <div className="voucher-page">
          <div className="container">
            <div className="row">
              {
                list.data.map((v) =>
                  <VoucherCard key={v._id} {...v} />
                )
              }
            </div>
          </div>
        </div>}
    </React.Fragment>
  )
}
export default VoucherPage