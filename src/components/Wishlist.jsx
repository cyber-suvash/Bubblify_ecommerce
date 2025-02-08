import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Wishlist = ({ wishlist = [] ,handleWishlist,handleAddtoCart}) => {
  return (
    <>
      <div className="container">
        <h2>Wishlist Items ({wishlist.length})</h2>
        {wishlist.length === 0 ? <p>No items in wishlist.</p> : null}
        <div className="wishlist-container d-flex flex-wrap gap-3">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} width="100" height={100} />
              <p className="mb-0">{item.title}</p>
              < div className=" mb-0 ">
            <button onClick={()=>handleWishlist(item)}><CloseIcon fontSize="medium" className="" sx={{color:"crimson"}} /></button>
            <Button onClick={()=>handleAddtoCart(item)}>Add</Button>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Wishlist;
