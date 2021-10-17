import { Link } from "react-router-dom"
export default function CategoryCard(props) {
  const { name, _id, image } = props.category;
  return (
    <Link
      style={{ cursor: "pointer", display: "flex" }}
      to={`/danh-sach-san-pham?danh-muc=${name.replace(/\s/g, "-").replace(/&/g, "")}-${_id}`}>
      <div className="image" style={{ width: "25px" }}>
        <div className="img-container">
          <img src={image} alt="" />
        </div>
      </div>
      <div>
        {name}
      </div>
    </Link>
  )
}