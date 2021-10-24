import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { constants as c } from '../../../constants';
import { appActions } from "../../../actions/appActions";
import { productActions } from '../../../actions/productActions';
import { formatPrice, handleImgErr, showNextElement, hideParentElement, uploadImage } from '../../../helper';
import Select from "../../../components/Select";
export default function ProductAddForm(props) {
  const dispatch = useDispatch();
  const myInput = useRef(null);
  const categories = useSelector(state => state.category.categories);
  const [productInfo, setProductInfo] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesUrl, setSelectedFilesUrl] = useState([]);
  const errMsg = {
    image: "Vui lòng cung cấp ảnh cho sản phẩm",
    quantity: "Số lượng tồn kho không hợp lệ",
    cate: "Vui lòng chọn loại sản phẩm",
    name: "Vui lòng điền tên sản phẩm",
  }
  useEffect(() => {
    if (!selectedFiles.length)
      return;
    let imagesUrl = [];
    imagesUrl = selectedFiles.map((v) => URL.createObjectURL(v));
    setSelectedFilesUrl(imagesUrl);
    return () => URL.revokeObjectURL(imagesUrl);
  }, [selectedFiles]);
  function handleChangeDescription(value) {
    let newInfo = { ...productInfo };
    newInfo.description = value;
    setProductInfo(newInfo);
  }
  function handleSelectCategory(v, e) {
    let newInfo = { ...productInfo };
    newInfo.categories = [v];
    setProductInfo(newInfo);
    hideParentElement(e);
  }
  function handleEditAttribute(e, i) {
    let newAttributes = productInfo.attributes ? [...productInfo.attributes] : [];
    newAttributes[i][e.target.name] = e.target.value;
    let newInfo = { ...productInfo };
    newInfo.attributes = newAttributes;
    setProductInfo(newInfo)
  }
  function handleAddAttribute() {
    let newAttributes = productInfo.attributes ? [...productInfo.attributes] : [];
    newAttributes.push({});
    let newInfo = { ...productInfo };
    newInfo.attributes = newAttributes;
    setProductInfo(newInfo);
  }
  function handleInputChange(e) {
    let newInfo = { ...productInfo };
    let { name, value } = e.target;
    if (name.includes("price")) {
      value = value.replace(/\./g, "");
      console.log(value)
      value = parseInt(value);
    }
    newInfo[name] = value;
    setProductInfo(newInfo);
  }
  async function handleFileSelect(e) {
    if (!e.target.files)
      return;
    const fileList = Array.prototype.slice.call(e.target.files);
    setSelectedFiles(fileList);
  }
  function validateProductInfo(p) {
    if (!p.name) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, errMsg.name));
      return false
    }
    if (!p.categories) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, errMsg.cate));
      return false
    }
    if (!p.images || !p.images.length) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, errMsg.image));
      return false
    }
    if (p.quantity < 1) {
      dispatch(appActions.changePopup(c.AUTOHIDE_POPUP, errMsg.quantity));
      return false
    }
    return true
  }
  async function handleSubmit() {
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }));
    let addInfo = { ...productInfo };
    let images = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      let formData = new FormData();
      formData.append("image", selectedFiles[i]);
      let url = await uploadImage(formData);
      images.push(url);
    }
    addInfo.images = [...images];
    let validateResult = validateProductInfo(addInfo);
    if (!validateResult) return
    console.log(addInfo);
    addInfo.categories = addInfo.categories.map(v => v._id);
    dispatch(productActions.addProduct(addInfo));
  }
  return (
    <div className="modal center">
      <div className="form-container">
        <button
          className="close-btn"
          style={
            { zIndex: "10" }
          }
          onClick={props.handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div
          className="product-form hide-scroll"
          style={
            { position: "relative" }
          }
        >
          <div className="row" >
            <label htmlFor="name">Tên</label>
            <input
              id="name"
              type="text"
              name="name"
              spellCheck={false}
              autoComplete="off"
              placeholder="Tên sản phẩm"
              onChange={handleInputChange}
              value={
                productInfo.name
                  ? productInfo.name
                  : ""
              }
            />
          </div>
          <div className="row">
            <label htmlFor="before_discount_price">
              Giá gốc
            </label>
            <input
              type="text"
              id="before_discount_price"
              name="before_discount_price"
              onChange={handleInputChange}
              value={formatPrice(productInfo.before_discount_price)}
            />
          </div>
          <div className="row">
            <label htmlFor="after_discount_price">
              Giá sau giảm
            </label>
            <input
              type="text"
              id="after_discount_price"
              name="after_discount_price"
              onChange={handleInputChange}
              value={formatPrice(productInfo.after_discount_price)}
            />
          </div>
          <div className="row">
            <label htmlFor="quantity">
              Số lượng
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              autoComplete="off"
              onChange={handleInputChange}
              value={formatPrice(productInfo.quantity)}
            />
          </div>
          <div className="row">
            <label>Danh mục</label>
            <Select
              values={
                categories.map(v => {
                  return { title: v.name, ...v }
                })
              }
              placeholder={
                productInfo.categories
                  ? productInfo.categories[0].name
                  : "Danh mục sản phẩm"
              }
              handleSelect={handleSelectCategory}
              showDetail={(e) => showNextElement(e, 200)}
            />
          </div>
          <div className="row" style={{ alignItems: "flex-start" }}>
            <label style={{ lineHeight: "38px" }}>Thông tin chi tiết</label>
            <div className="attribute">
              {
                productInfo.attributes
                && productInfo.attributes.map((v, i) =>
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      value={v.name}
                      onChange={(e) => handleEditAttribute(e, i)}
                    />
                    <input
                      type="text"
                      name="value"
                      autoComplete="off"
                      value={v.value}
                      onChange={(e) => handleEditAttribute(e, i)}
                    />
                  </div>
                )
              }
              <button onClick={handleAddAttribute}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="row" style={{ alignItems: "flex-start" }}>
            <label style={{ lineHeight: "38px" }}>Mô tả</label>
            <div className="description">
              <ReactQuill
                value={
                  productInfo.description
                    ? productInfo.description
                    : ""
                }
                onChange={handleChangeDescription} />
            </div>
          </div>
          <div className="row" style={{ alignItems: "flex-start" }}>
            <label style={{ lineHeight: "38px" }}>Hình ảnh</label>
            <div className="images">
              {
                selectedFilesUrl.length > 0
                && selectedFilesUrl.map((v, i) =>
                  <div className="image" key={i}>
                    <div className="img-container">
                      <img src={v} onError={handleImgErr} alt="" />
                    </div>
                  </div>
                )
              }
              <div
                className="image"
                style={{ cursor: "pointer" }}
                onClick={() => { myInput.current.click() }}
              >
                <input
                  type="file"
                  ref={myInput}
                  multiple={true}
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                  accept="image/jpeg, image/jpg, image/png"
                />
                <div className="img-container">
                  <img src="/img/add_img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <button
            id="submit-btn"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}