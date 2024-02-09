import React from "react";
import "./pagination.css";

const Pagination = ({ page, limit, total, setPage }) => {
  const tottalPages = Math.ceil(total / limit);
  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className="page-container">
      {tottalPages > 0 &&
        [...Array(tottalPages)].map((val, index) => (
          <button
            className={`${page === index + 1 ? "page_btn active" : "page_btn"}`}
            key={index}
            onClick={() => onClick(index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
