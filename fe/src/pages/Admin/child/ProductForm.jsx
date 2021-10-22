import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from "../../../components/Select";
import { productActions } from '../../../actions/productActions';
import { formatPrice, handleImgErr, showNextElement, hideParentElement } from '../../../helper';
export default function ProductForm(props) {
  const dispatch = useDispatch();
  const {
    name,
    attributes,
    before_discount_price,
    after_discount_price,
    images,
    description } = props.product;
  const myRef = useRef(null);
  const categories = useSelector(state => state.category.categories);
  const [currentAttributeIndex, setCurrentAttributeIndex] = useState(-1);
  const [currentAttributeValue, setCurrentAttributeValue] = useState({});
  useEffect(() => {
  });
  function handleChangeDescription(value) {
    props.handleInputChange({
      target: {
        name: "description",
        value
      }
    })
  }
  function handleSelectCategory(v, e) {
    props.handleInputChange({
      target: {
        name: "categories",
        value: [v]
      }
    });
    hideParentElement(e);
  }
  function handleEditAttribute(e) {
    let value = { ...currentAttributeValue };
    value[e.target.name] = e.target.value;
    setCurrentAttributeValue(value)
  }
  function handleSubmit() {
    console.log(props.product);
    if (props.product._id) {
      dispatch(productActions.updateProduct({
        ...props.product,
        categories: [props.product.categories[0]._id]
      }));
      return;
    }
    dispatch(productActions.addProduct(props.product))
  }
  function handleSelectAttribute(i) {
    console.log(currentAttributeValue)
    if (i === currentAttributeIndex) {
      let newAttributes = [...attributes];
      newAttributes[currentAttributeIndex] = currentAttributeValue;
      props.handleInputChange({
        target: {
          name: "attributes",
          value: newAttributes
        }
      });
      setCurrentAttributeIndex(-1);
      return;
    }
    setCurrentAttributeIndex(i);
    setCurrentAttributeValue(attributes[i]);
  }
  function handleAddAttribute() {
    let newAttributes = attributes ? [...attributes] : [];
    newAttributes.push({});
    props.handleInputChange({
      target: {
        name: "attributes",
        value: newAttributes
      }
    });
  }
  return (
    <div className="form-container">
      <button
        style={{ zIndex: "10" }}
        onClick={props.handleClose}
        className="close-btn">
        <i className="fas fa-times"></i>
      </button>
      <div className="product-form hide-scroll" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0 }} ref={myRef}></div>
        <div className="row" >
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={props.handleInputChange}
            value={name ? name : ""}
          />
        </div>
        <div className="row">
          <label htmlFor="before_discount_price">Giá gốc</label>
          <input
            type="text"
            name="before_discount_price"
            id="before_discount_price"
            onChange={props.handleInputChange}
            value={formatPrice(before_discount_price)}
          />
        </div>
        <div className="row">
          <label htmlFor="after_discount_price">Giá sau giảm</label>
          <input
            type="text"
            name="after_discount_price"
            id="after_discount_price"
            onChange={props.handleInputChange}
            value={formatPrice(after_discount_price)}
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
              props.product.categories
                ? props.product.categories[0].name
                : "Danh mục sản phẩm"
            }
            showDetail={(e) => showNextElement(e, 200)}
            handleSelect={handleSelectCategory}
          />
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Thông tin chi tiết</label>
          <div className="attribute">
            {
              attributes && attributes.map((v, i) =>
                <div
                  key={v.name}
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
                    value={
                      i === currentAttributeIndex
                        ? currentAttributeValue.name
                        : v.name
                    }
                    style={{
                      opacity: i !== currentAttributeIndex
                        ? "0.7"
                        : "1"
                    }}
                    disabled={i !== currentAttributeIndex}
                    onChange={(e) => handleEditAttribute(e, i)}
                  />
                  <input
                    type="text"
                    name="value"
                    autoComplete="off"
                    value={
                      i === currentAttributeIndex
                        ? currentAttributeValue.value
                        : v.value
                    }
                    style={{
                      opacity: i !== currentAttributeIndex
                        ? "0.7"
                        : "1"
                    }}
                    disabled={i !== currentAttributeIndex}
                    onChange={(e) => handleEditAttribute(e, i)}
                  />
                  <button
                    className="edit-btn"
                    onClick={() => handleSelectAttribute(i)}
                  >
                    {
                      currentAttributeIndex !== i
                        ? <i className="far fa-edit"></i>
                        : <i className="far fa-share-square"></i>
                    }
                  </button>
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
              value={description ? description : ""}
              onChange={handleChangeDescription} />
          </div>
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Hình ảnh</label>
          <div className="images">
            {
              images && images.map((v) =>
                <div className="image">
                  <div className="img-container">
                    <img src={v} onError={handleImgErr} alt="" />
                  </div>
                </div>
              )
            }
            <div className="image">
              <div className="img-container">
                <img src="/img/default_product.jpg" alt="" />
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
  )
}