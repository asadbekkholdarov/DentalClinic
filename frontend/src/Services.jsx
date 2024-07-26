// frontend/src/services/doctorService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/doctors";

export const getDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await axios.post(API_URL, doctorData);
  return response.data;
};

export const updateDoctor = async (id, doctorData) => {
  const response = await axios.put(`${API_URL}/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
