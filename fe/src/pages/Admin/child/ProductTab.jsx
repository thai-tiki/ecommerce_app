import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../helper";
import ProductForm from "./ProductForm";
export default function ProductTab(props) {
  const formStatus = {
    open: "center",
    hide: ""
  }
  const products = useSelector(state => state.product.list);
  const [customClass, setCustomClass] = useState(formStatus.hide);
  const [currentProduct, setCurrentProduct] = useState(null);
  function handleAddProduct() {
    setCurrentProduct({});
  }
  function handleEditProduct(p) {
    console.log(p);
    setCustomClass(formStatus.open);
    setCurrentProduct(p);
  }
  function handleInfoChange(e) {
    let newInfo = { ...currentProduct };
    let { name, value } = e.target;
    if (name.includes("price")) {
      value = value.replace(/\./g, "");
      console.log(value)
      value = parseInt(value);
    }
    newInfo[name] = value;
    setCurrentProduct(newInfo);
  }
  function closeForm() {
    setCurrentProduct(null);
  }
  useEffect(() => {
    if (currentProduct)
      setCustomClass(formStatus.open);
    else
      setCustomClass(formStatus.hide)
  }, [currentProduct])
  return (
    products.list.length > 0 &&
    <div className="product-tab tab">
      <div className="row">
        <h4>Quản lý sản phẩm</h4>
        <button
          onClick={handleAddProduct}>
          Sản phẩm mới <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="table-fixed">
        <table>
          <thead>
            <tr>
              <th style={{ maxWidth: "250px" }}>Tên</th>
              <th>Loại</th>
              <th>Giá gốc</th>
              <th>Giá sau giảm</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{}}>
            {
              products.list.map((v) =>
                <tr key={v._id} onClick={() => handleEditProduct(v)}>
                  <td style={{ maxWidth: "250px" }}>{v.name}</td>
                  <td style={{ maxWidth: "150px" }}>{v.categories[0].name}</td>
                  <td>{formatPrice(v.before_discount_price)}</td>
                  <td>{formatPrice(v.after_discount_price)}</td>
                  <td>
                    <button>
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className={`modal ${customClass}`}>
        {
          currentProduct &&
          <ProductForm
            product={currentProduct}
            handleInputChange={handleInfoChange}
            handleClose={closeForm} />
        }
      </div>
    </div>
  )
}