import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
const SearchBox = () => {
  return (
    <>
      <div className="searchbar d-flex">
        <input type="text" placeholder="Search products.." />
        <Button className="search-icon">
          <SearchIcon style={{ color: "#2518ddbb" }} sx={{ fontSize: 40 }} />
        </Button>
      </div>
    </>
  );
};

export default SearchBox;
