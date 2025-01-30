import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dialog from "@mui/material/Dialog";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";

const CountrydropDown = () => {
  const [openbox, setOpenbox] = useState(false);
  const [country, setCountry] = useState([]);
  const [searchdata, setSearchdata] = useState(""); // For search input
  const [filteredItems, setFilteredItems] = useState([]); // For filtered results
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleDialogbox = () => {
    setOpenbox(!openbox);
  };

  const handleSearch = (e) => {
    setSearchdata(e.target.value); // Update search input
  };

  const handleSelected = (index, item) => {
    setSelectedCountry(item);
    setOpenbox(false);
  };

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        console.log("Starting API call...");
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/"
        );
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const datafile = await res.json();
        setCountry(datafile.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    if (searchdata.trim() === "") {
      setFilteredItems(country);
    } else {
      const filtered = country.filter((item) =>
        item.country.toLowerCase().includes(searchdata.toLowerCase())
      );
      setFilteredItems(filtered); // Update filtered results
    }
  }, [searchdata, country]);

  return (
    <>
      <Button className="countryDrop" onClick={handleDialogbox}>
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="name">{selectedCountry?selectedCountry:"set Location"}</span>
        </div>
        <span className="m-auto">
          <ArrowDropDownIcon />
        </span>
      </Button>

      <Dialog open={openbox} onClose={handleDialogbox}>
        <h5>Choose your Delivery Location</h5>
        <div className="cancel-icon">
          <CancelIcon
            sx={{ fontSize: 35, color: "#389be2" }}
            onClick={handleDialogbox}
          />
        </div>

        <p>Enter your address and we will specify the offer for your area.</p>
        <div className="searchbar d-flex w-100">
          <input
            type="text"
            placeholder="Search countries here..."
            value={searchdata}
            onChange={handleSearch}
          />
          <Button className="search">
            <SearchIcon style={{ color: "#2518ddbb" }} sx={{ fontSize: 40 }} />
          </Button>
        </div>
        <hr />
        <div className="options d-flex flex-column">
          {filteredItems.map((item, indx) => (
            <span key={indx} onClick={handleDialogbox}>
              <Button
                onClick={() => handleSelected(indx, item.country)}
                className={`${
                  selectedCountry === item.country ? "active-country" : ""
                }`}
              >
                {item.country}
              </Button>
            </span>
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default CountrydropDown;
