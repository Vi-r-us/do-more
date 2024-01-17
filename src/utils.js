import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:500-/api/tasks",
});

export default customFetch;
