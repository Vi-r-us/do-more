import axios from "axios";
import { nanoid } from "nanoid";

export const customFetch = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

const defaultItems = [
  { id: nanoid(), title: "Complete online JavaScript course", isDone: true },
  { id: nanoid(), title: "Jog around the park 3x", isDone: false },
  { id: nanoid(), title: "10 minutes meditation", isDone: false },
  { id: nanoid(), title: "Read for 1 hour", isDone: false },
  { id: nanoid(), title: "Pick up groceries", isDone: false },
  {
    id: nanoid(),
    title: "Complete Todo App on Frontend Mentor",
    isDone: false,
  },
];

export const getItemByFilter = (filter, tasks) => {
  if (filter === "all") return [...tasks];
  else if (filter === "active") return tasks.filter((task) => !task.isDone);
  else return tasks.filter((task) => task.isDone);
};

export const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) list = JSON.parse(localStorage.getItem("list"));
  else list = defaultItems;
  return list;
};
export const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

export const getUserPreferenceTheme = () => {
  const userPreferenceBrowserSetting = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const userPreferenceLocalStorage =
    localStorage.getItem("dark-theme") === "true";
  if (userPreferenceLocalStorage != null) return userPreferenceLocalStorage;
  return userPreferenceBrowserSetting;
};

// eslint-disable-next-line no-unused-vars
const mapToArray = (map) => {
  // if array is already an array
  if (Array.isArray(map)) return map;
  return Array.from(map.values());
};
// eslint-disable-next-line no-unused-vars
const arrayToMap = (array) => {
  // if array is already an map
  if (!Array.isArray(array)) return array;
  return new Map(array.map((it) => [it.id, it]));
};

// export default customFetch;
