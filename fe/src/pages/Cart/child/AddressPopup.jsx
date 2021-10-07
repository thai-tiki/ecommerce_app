import AddressCard from "./AddressCard";
export default function AddressPopup(props) {
  return (
    <div className="address-popup">
      <button onClick={props.handleClosePopup}>
        <i className="far fa-times-circle"></i>
      </button>
      <h4>Địa chỉ giao hàng</h4>
      <div>
        {
          props.userAddress.map((v, i) =>
            <AddressCard
              key={i}
              id={v.id}
              address={v}
              name={v.name}
              wardName={v.wards_name}
              isDefault={v.is_default}
              detail={v.address_detail}
              provinceName={v.province_name}
              districtName={v.district_name}
            />
          )
        }
      </div>
    </div>
  )
}