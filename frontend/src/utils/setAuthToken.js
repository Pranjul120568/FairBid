import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
    } catch (error) {
      console.log(error);
    }
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
