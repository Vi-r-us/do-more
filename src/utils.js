import axios from "axios";

export const customFetch = axios.create({
  baseURL: "http://localhost:500-/api/tasks",
});

export const getItemByFilter = (filter, itemsMap) => {
  // console.log(itemsMap);
  if (filter === "all") return [...mapToArray(itemsMap)];
  else if (filter === "active")
    return mapToArray(itemsMap).filter((item) => !item.isDone);
  else return mapToArray(itemsMap).filter((item) => item.isDone);
};

// const allItems = (itemsMap) => setFilteredItems([...mapToArray(itemsMap)]);
// const allActiveItems = (itemsMap) =>
//   setFilteredItems(mapToArray(itemsMap).filter((item) => !item.isDone));
// const allCompletedItems = (itemsMap) =>
//   setFilteredItems(mapToArray(itemsMap).filter((item) => item.isDone));

const mapToArray = (map) => Array.from(map.values());
export const arrayToMap = (array) => new Map(array.map((it) => [it.id, it]));

// export default customFetch;
