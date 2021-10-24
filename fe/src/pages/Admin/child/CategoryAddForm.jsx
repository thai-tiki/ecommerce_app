import { useRef } from "react"
export default function CategoryAddForm() {
  const myInput = useRef(null)
  return (
    <div className="category-form">
      <h3>Thêm danh mục</h3>
      <div className="form-container">
        <div className="row">
          <label htmlFor="name">Tên danh mục</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <label style={{ lineHeight: "38px" }}>Hình ảnh</label>
          <div className="images">
            <div
              className="image"
              style={{ cursor: "pointer" }}
              onClick={() => { myInput.current.click() }}
            >
              <input
                type="file"
                ref={myInput}
                multiple={true}
                style={{ display: "none" }}
                accept="image/jpeg, image/jpg, image/png"
              />
              <div className="img-container">
                <img src="/img/add_img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <button id="submit-btn">Thêm</button>
      </div>
    </div>
  )
}