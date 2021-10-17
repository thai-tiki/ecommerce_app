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
              {...v}
              key={i}
              id={v.id}
              index={i}
              address={v}
            />
          )
        }
      </div>
    </div>
  )
}