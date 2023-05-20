import axios from "axios";

export default axios.create({
  // URL for our JSON server for the db file
  baseURL: "http://localhost:3500",
});
