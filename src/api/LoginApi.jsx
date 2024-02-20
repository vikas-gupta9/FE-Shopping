export const getLoginUsers = async (auth) => {
    const response = await fetch("http://localhost:8000/users/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      const data = await response.json();
      return data;
}

export  const handleLogInQuery = async (login) => {
    const response = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
}