import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const addOne = (newEntry) => {
  const request = axios.post(url, newEntry);
  return request.then((response) => response.data);
};

const deleteOne = (id) => {
  const request = axios.delete(`${url}/${id}`, id);
  return request.then((response) => response);
};

const update = (id, newEntry) => {
  const request = axios.put(`${url}/${id}`, newEntry);
  return request.then((response) => response.data);
};

export default { getAll, addOne, deleteOne, update };
