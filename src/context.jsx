import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { arrayToMap } from "./utils";

const AppContext = React.createContext();

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

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [itemsMap, setItemsMap] = useState(arrayToMap(defaultItems));
  const [currentFilter, setCurrentFilter] = useState("all");

  const addItem = (title) => {
    const updatedItemsMap = new Map([...itemsMap]);
    const newItem = { id: nanoid(), title: title, isDone: false };
    updatedItemsMap.set(newItem.id, newItem);
    setItemsMap(updatedItemsMap);
  };

  const editItem = (id) => {
    const updatedItemsMap = new Map([...itemsMap]);
    const newItem = itemsMap.get(id);
    newItem.isDone = !newItem.isDone;
    updatedItemsMap.set(id, newItem);
    setItemsMap(updatedItemsMap);
  };

  const deleteItem = (id) => {
    const updatedItemsMap = new Map([...itemsMap]);
    updatedItemsMap.delete(id);
    setItemsMap(updatedItemsMap);
    // setFilteredItems([...mapToArray(updatedItemsMap)]);
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
