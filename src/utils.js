import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://localhost:500-/api/tasks",
});

export const mapToArray = (map) => Array.from(map.values());
export const arrayToMap = (array) => new Map(array.map((it) => [it.id, it]));

// export default customFetch;
