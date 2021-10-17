import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function ProductForm(props) {
  const [description, setDescription] = useState("");
  function handleChange(value) {
    console.log(value);
    setDescription(value)
  }
  useEffect(() => {
    document.getElementsByTagName("BODY")[0].style.height = "100vh";
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden"
  })
  return (
    <div className="form-container">
      <button
        onClick={props.handleClose}
        className="close-btn">
        <i className="fas fa-times"></i>
      </button>
      <div className="product-form hide-scroll">
        <div className="row">
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            name="name"
            id="name"
            value={"iPad Air 4 10.9-inch Wi-Fi +Cellular 64GB - Hàng chính hãng - Trắng"}
          />
        </div>
        <div className="row">
          <label htmlFor="before_discount_price">Giá gốc</label>
          <input
            type="number"
            name="before_discount_price"
            id="before_discount_price"
            value={"18250000"}
          />
        </div>
        <div className="row">
          <label htmlFor="after_discount_price">Giá sau giảm</label>
          <input
            type="number"
            name="after_discount_price"
            id="after_discount_price"
            value={"18250000"}
          />
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Thông tin chi tiết</label>
          <div className="attribute">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <input type="text" value={"Dung lượng pin"} />
              <input type="text" value={"7600 mAh"} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <input type="text" value={"Bluetooth"} />
              <input type="text" value={"Bluetooth 5.0"} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <input type="text" value={"Thương hiệu"} />
              <input type="text" value={"Apple"} />
            </div>
            <button><i className="fas fa-plus"></i></button>
          </div>
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Mô tả</label>
          <div className="description">
            <ReactQuill value={description}
              onChange={handleChange} />
          </div>
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Hình ảnh</label>
          <div className="images">
            <div className="image">
              <div className="img-container">
                <img src="/img/default_product.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button id="submit-btn">Lưu</button>
      </div>
    </div>
  )
}