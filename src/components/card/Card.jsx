import React, { useEffect, useState } from "react";
import ColorFilter from "../colorFilter/ColorFilter";

import "./card.css";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../redux/cartSlice/cartSlice";
import { getImageURL } from "../../util/image-util";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import { debounce } from "../../debounce/debounce";
import { useMutation } from "@tanstack/react-query";
import { handleSearch } from "../../api/ProductApi";


const Card = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { token: auth, loggedIn, user_id } = cookies;
  const [products, setProducts] = useState([]);
  const productsData = products;
  const [filter, setFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState("");
  const [pageData, setPageData] = useState({
    limit: 0,
    total: 0,
  });

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    const sortedProducts = products.sort((a, b) => {
      if (filter === "high_to_low") {
        return a.price - b.price;
      }
      //  return b.price - a.price;
      else if (filter === "low_to_high") {
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

  // const handleGetProductDetails = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/cart/getall", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         // Authorization: `Bearer ${auth}`,
  //       },
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       // console.log("data", data);
  //       setProducts(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   handleGetProductDetails();
  // }, []);

  const handleAddToCart = async (item) => {
    const itemData = {
      name: item?.name,
      id: item?._id,
      description: item?.description,
      color: item?.color,
      price: item?.price,
      files: item?.files[0]?.fileName,
      user_id: item?.user_id,
      quantity: 1,
    };

    if (loggedIn === true) {
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
    } else {
      dispatch(addtoCart(itemData));
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/cart/search?search=${searchValue.trim()}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const { limit, total } = data;
        setPageData({
          limit: limit,
          total: total,
        });
        setProducts(data?.searchData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let delaytime = setTimeout(() => handleSearch(), 1000);
    return () => {
      clearTimeout(delaytime);
    };
  }, [searchValue, page]);

//  const searchMutation = useMutation({
//     mutationFn: handleSearch,
//     onSuccess:(data) => {
     
//     }
//   })


  return (
    <div className="card-container">
      <div className="card-header">
        <div className="card-color-filter">
          <span data-testid="Filter" onClick={handleOpen}>
            Filter
          </span>
          {filterOpen && (
            <ColorFilter
              products={productsData}
              setProductsColor={setProducts}
              handleGetProductDetails={handleSearch}
              handleClose={handleClose}
            />
          )}
        </div>
        <div className="card-search">
          <span>Search:&nbsp;</span>
          <input
            className="card-search-input"
            type="text"
            placeholder="Search by name"
            value={searchValue}
            onChange={(e) => { setSearchValue(e.target.value)
            
            }}
          ></input>
        </div>
        <div className="select-price-container" data-testid="Sort by">
          Sort by :
          <select
            className="select-price"
            id="price-filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option className="select-price-item" defaultValue="" hidden>
              Featured
            </option>
            <option className="select-price-item" value="high_to_low">
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
          <React.Fragment key={item?._id}>
            <div className="cards">
              <div className="cards-image">
                <img src={getImageURL(item?.files[0]?.fileName)} alt="image" />
                <div className="cards-cart-color">
                  <span>{item?.color}</span>
                </div>
                <div
                  className="cards-cart"
                  onClick={() => handleAddToCart(item)}
                >
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
          </React.Fragment>
        ))}
      </div>
      <Pagination
        page={page}
        limit={pageData?.limit}
        total={pageData?.total}
        setPage={(page) => setPage(page)}
      />
    </div>
  );
};

export default Card;
