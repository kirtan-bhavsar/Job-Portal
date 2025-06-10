import axios from "axios";

export const customFetch = await axios.create({
  baseURL: "/api/v1",
});
