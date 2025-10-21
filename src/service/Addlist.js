import axios from "axios";

const API_URL = "http://localhost:8080/api/files/upload";

export const addData = async (formData) => {
  try {
    // Make POST request with multipart/form-data
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading data:", error);
    throw error; // throw to handle it in React
  }
};
