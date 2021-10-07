import { useSelector } from "react-redux";
import CategoryCard from "../../components/CategoryCard";
function CategoriesPage() {
  const categories = useSelector(state => state.category.categories);
  return (
    <div className="categories-page">
      <h3>Danh mục sản phẩm</h3>
      <div className="row">
        {
          categories.map((v, i) =>
            <CategoryCard
              image={v.image_url}
              title={v.name}
              id={v.id}
              key={i}
            />
          )
        }
      </div>
    </div>
  )
}
export default CategoriesPage