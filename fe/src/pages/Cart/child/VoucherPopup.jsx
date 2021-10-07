import React from "react";
import VoucherCard from "./VoucherCard";
export default function VoucherPopup(props) {
  return (
    <div className="voucher-popup">
      <button onClick={props.handleClosePopup}>
        <i className="far fa-times-circle"></i>
      </button>
      <h4>Mã giảm giá</h4>
      {
        props.vouchers.length > 0
          ?
          <React.Fragment>
            {
              props.vouchers.map((v, i) =>
                <VoucherCard
                  onSelect={props.handleSelectVoucher}
                  voucher={v}
                  key={i}
                />
              )
            }
          </React.Fragment>
          :
          <div>
            Không có voucher phù hợp!
          </div>
      }
    </div>
  )
}