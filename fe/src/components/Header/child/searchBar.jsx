import { useState } from "react";
export default function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");
  function handleSearch() {
    if (searchValue !== "")
      window.location.href =
        window.location.origin + "/danh-sach-san-pham?search=" + searchValue;
  }
  function handleEnter(e) {
    if (e.key === "Enter") handleSearch();
  }
  return (
    <div className="search-bar" onKeyDown={handleEnter}>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} />
      <button onClick={handleSearch} >
        <img src="/img/search.svg" alt="search" />
      </button>
    </div>
  )
}