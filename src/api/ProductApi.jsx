
  export const handleSearch = async ({searchValue,page}) => {
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
     return data;
  };