import axios from "axios";

const API_URL = "https://assignment.stage.crafto.app";

export const login = async (username, otp) => {
  const response = await axios.post(`${API_URL}/login`, { username, otp });
  return response.data;
};

export const getQuotes = async (limit = 20, offset = 0) => {
  const response = await axios.get(
    `${API_URL}/getQuotes?limit=${limit}&offset=${offset}`,
    {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

export const uploadImageAndGetURL = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post(
    `https://crafto.app/crafto/v1.0/media/assignment/upload`,
    formData,
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response);
  return response.data;
};

export const postQuote = async (text, mediaUrl) => {
  const response = await axios.post(
    `${API_URL}/postQuote`,
    { text, mediaUrl },
    {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
