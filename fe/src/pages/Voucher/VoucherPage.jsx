import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../helper";
import Header from "../../components/Header";
import VoucherCard from "./child/VoucherCard";
import { constants as c } from "../../constants";
import PageLoading from "../../components/PageLoading";
import { voucherActions } from "../../actions/voucherActions";
import EmptyVoucher from "../../components/Empty/EmptyVoucher";
function VoucherPage() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.voucher.list);
  const allProductArray = useMemo(() => list.data.filter(v => v.voucher_type === 0), [list]);
  const specialProductArray = useMemo(() => list.data.filter(v => v.voucher_type === 1), [list]);
  useEffect(() => {
    console.log(allProductArray);
    document.title = "Mã giảm giá";
    if (list.status === c.LOADING)
      dispatch(voucherActions.getAllVoucher());
  }, [])
  return (
    <React.Fragment>
      <Header />
      {list.status === c.LOADING ? <PageLoading /> :
        list.data.length === 0 ? <EmptyVoucher /> : <div className="voucher-page">
          <div className="container">
            <h3>Voucher áp dụng toàn shop</h3>
            <div className="row">
              {
                allProductArray.map((v, i) =>
                  <VoucherCard key={i} {...v} />
                )
              }
            </div>
            <h3>Voucher áp dụng cho sản phẩm</h3>
            <div className="row">
              {
                specialProductArray.map((v, i) =>
                  <VoucherCard key={i} {...v} />
                )
              }
            </div>
          </div>
        </div>}
    </React.Fragment>
  )
}
export default VoucherPage