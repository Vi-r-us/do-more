import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  arrayToMap,
  customFetch,
  getLocalStorage,
  setLocalStorage,
} from "./utils";
import { useQuery } from "react-query";

const AppContext = React.createContext();

const defaultItems = getLocalStorage();

const QUERY_KEY = "tasks";

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [itemsMap, setItemsMap] = useState(arrayToMap(defaultItems));
  const [currentFilter, setCurrentFilter] = useState("all");

  // TODO: add server side support
  const { data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => customFetch.get("/"),
  });

  useEffect(() => {
    if (data?.data.taskList) setItemsMap(arrayToMap(data?.data.taskList));
    console.log(data);
  }, [data?.data.taskList]);

  const addItem = (title) => {
    const updatedItemsMap = new Map([...itemsMap]);
    const newItem = { id: nanoid(), title: title, isDone: false };
    updatedItemsMap.set(newItem.id, newItem);
    setItemsMap(updatedItemsMap);
    setLocalStorage(updatedItemsMap);
  };

  const editItem = (id) => {
    const updatedItemsMap = new Map([...itemsMap]);
    const newItem = itemsMap.get(id);
    newItem.isDone = !newItem.isDone;
    updatedItemsMap.set(id, newItem);
    setItemsMap(updatedItemsMap);
    setLocalStorage(updatedItemsMap);
  };

  const deleteItem = (id) => {
    const updatedItemsMap = new Map([...itemsMap]);
    updatedItemsMap.delete(id);
    setItemsMap(updatedItemsMap);
    setLocalStorage(updatedItemsMap);
  };

  const deleteAllItems = () => {
    const updatedItemsMap = new Map();
    setItemsMap(updatedItemsMap);
    setLocalStorage(updatedItemsMap);
  };

  return (
    <AppContext.Provider
      value={{
        itemsMap,
        currentFilter,
        setCurrentFilter,
        addItem,
        editItem,
        deleteItem,
        deleteAllItems,
      }}
    >
      {children}?
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
