import { useState } from "react";
import "./colorFilter.css";

// eslint-disable-next-line react/prop-types
const ColorFilter = ({ products, setProductsColor, handleClose ,handleGetProductDetails}) => {
  // eslint-disable-next-line react/prop-types
  const uniqueColors = [...new Set(products.map((item) => item.color))];
  const [selectedColors, setSelectedColors] = useState([]);
  // const[colorCheck, setColorCheck] = useState(false)

  const handleColorChange = (e) => {
    const color = e.target.value;
    // setColorCheck(e.target.checked)
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleViewResults = () => {
    // eslint-disable-next-line react/prop-types
    const newData = products.filter((item) =>
      selectedColors.length === 0 ? true : selectedColors.includes(item.color)
    );
    setProductsColor(newData);
    handleClose()
  };

  const handleClearFilters = () => {
    handleGetProductDetails()
    setSelectedColors([])
    // handleClose()
  };

  return (
    <>
      <div className="colorfilter-component">
        <div className="colorfilter-container">
        <label className="close-filter" onClick={handleClose}>X</label>
          <div className="colorfilter-header">
            <span>Color</span>
            <span>{selectedColors.length} filter selected</span>
          </div>
          <div className="colorfilter-text-container">
            {uniqueColors.map((color, index) => (
              <label className="colorfilter-text" key={index}>
                <input
                  type="checkbox"
                  value={color}
                  // checked={colorCheck}
                  onChange={(e) => handleColorChange(e)}
                />
                {color}
              </label>
            ))}
          </div>
          <div className="colorfilter-button">
            <button onClick={handleClearFilters}>Clear Filterss</button>
            <button onClick={handleViewResults}>View Results</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorFilter;
