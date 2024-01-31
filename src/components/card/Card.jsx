import React, { useEffect, useState } from "react";
import ColorFilter from "../colorFilter/ColorFilter";

import "./card.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../redux/cartSlice/cartSlice";
import { getImageURL } from "../../util/image-util";
import { toast } from "react-toastify";


const Card = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const [products, setProducts] = useState([]);
  const productsData = products;
  const [filter, setFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const sortedProducts = products.sort((a, b) => {
      if (filter === "high_to_low") {
        return a.price - b.price;
      } else
      //  return b.price - a.price;

  if (filter === "low_to_high") {
        return b.price - a.price;
      } else return a.price - b.price;
    });
  };

  const handleClose = () => {
    setFilterOpen(false);
  };
  const handleOpen = () => {
    setFilterOpen(true);
  };

  const handleGetProductDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/cart/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("data", data);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetProductDetails();
  }, []);

  const handleAddToCart = async (item) => {
    console.log("first", item);
    console.log("first-id", item?._id);
    const itemData = {
      name: item?.name,
      id:item?._id,
      description: item?.description,
      color: item?.color,
      price: item?.price,
      files: item?.files[0]?.fileName,
      user_id: item?.user_id,
      quantity:1,
    };
    try {
      const response = await fetch("http://localhost:8000/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
          id: item?._id,
        },
        body: JSON.stringify(itemData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("item-data", data);
        toast.success("Item added to cart");
        return dispatch(addtoCart(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-color-filter">
          <span  data-testid="Filter" onClick={handleOpen}>Filter</span>
          {filterOpen &&
            <ColorFilter
              products={productsData}
              setProductsColor={setProducts}
              handleGetProductDetails={handleGetProductDetails}
              handleClose={handleClose}
            />
         }
        </div>
        <div className="select-price-container"  data-testid="Sort by">
          Sort by :
          <select
            className="select-price"
            id="price-filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option className="select-price-item" defaultValue="" hidden> Featured</option>
            <option className="select-price-item"  value="high_to_low">
              High to Low
            </option>
            <option className="select-price-item" value="low_to_high">
              Low to High
            </option>
          </select>
        </div>
      </div>
      <div className="card-items-container">
        {products.map((item) => (
          <div className="cards" key={item?._id}>
            <div className="cards-image">
              <img src={getImageURL(item?.files[0]?.fileName)} alt="image" />
              <div className="cards-cart-color">
                <span>{item?.color}</span>
              </div>
              <div className="cards-cart" onClick={() => handleAddToCart(item)}>
                <span>add to cart</span>
              </div>
            </div>
            <div className="cards-name-price">
              <div>{item?.name}</div>
              <div>${item?.price}</div>
            </div>
            <div className="cards-description">
              <span>{item?.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
