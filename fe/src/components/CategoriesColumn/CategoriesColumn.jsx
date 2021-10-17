import CategoryCard from "./child/CetegoryCard";
function CategoriesColumn(props) {
  const { categories, title } = props;
  return (
    <div className="categories-column">
      <div className="main-title">
        <h3>{title}</h3>
      </div>
      <div className="column">
        {
          categories.map((v) => <CategoryCard key={v._id} category={v} />)
        }
      </div>
    </div>
  )
}
export { CategoriesColumn }