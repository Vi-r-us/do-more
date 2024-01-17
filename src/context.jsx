import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import customFetch from "./utils";

const AppContext = React.createContext();

const defaultItems = [
  { id: nanoid(), title: "walk the dog", isDone: false },
  { id: nanoid(), title: "wash dishes", isDone: false },
  { id: nanoid(), title: "drink coffee", isDone: true },
  { id: nanoid(), title: "take a nap", isDone: false },
];

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  // const result = useQuery({
  //   queryKey: ["tasks"],
  //   queryFn: () => customFetch.get("/"),
  // });
  // console.log(result);

  const [items, setItems] = useState(defaultItems);

  return (
    <AppContext.Provider value={{ items }}>{children}</AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
