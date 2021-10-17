import { useState } from "react";
import ProductForm from "./ProductForm";
export default function ProductTab(props) {
  const [customClass, setCustomClass] = useState("");
  return (
    <div className="product-tab tab">
      <div className="row">
        <h4>Quản lý sản phẩm</h4>
        <button
          onClick={() => setCustomClass("center")}>
          Sản phẩm mới <i className="fas fa-plus"></i>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Loại</th>
            <th>Giá gốc</th>
            <th>Giá sau giảm</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iPad Pro M1 12.9 inch (2021) 256GB Wifi - Hàng Chính Hãng</td>
            <td>Điện thoại - Máy tính bảng</td>
            <td>33.990.000</td>
            <td>32.990.000</td>
            <td><button><i className="far fa-edit"></i></button></td>
          </tr>
        </tbody>
      </table>
      <div className={`modal ${customClass}`}>
        <ProductForm handleClose={() => setCustomClass("")} />
      </div>
    </div>
  )
}