import axios from "axios";

const API_BASE_URL = "http://localhost:5000/users";

export const fetchAvatars = () => {
  return axios.get(`${API_BASE_URL}`);
};

export const updateUser = (user) => {
  return axios.put(`${API_BASE_URL}/${user.id}`, user);
};
