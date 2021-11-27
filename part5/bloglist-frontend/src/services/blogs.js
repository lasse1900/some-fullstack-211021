import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = (id, data) => {
  const config = { headers: { Authorization: token } };

  const request = axios.put(`${baseUrl}/${id}`, data, config);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
