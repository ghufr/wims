const makeRequest = async (request) => {
  const token = window.localStorage.getItem("uhuyy");
  if (!token) return [];

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return request({ headers, withCredentials: true })
    .then((res) => res.data)
    .catch(() => {
      // window.history.replace("/login");
    });
};

export { makeRequest };
