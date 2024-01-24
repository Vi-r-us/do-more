/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useQuery } from "react-query";
import { useGlobalContext } from "../context";
import { customFetch, getItemByFilter } from "../utils";
import SingleItem from "./SingleItem";

const Items = () => {
  const { itemsMap, currentFilter, setCurrentFilter, deleteAllItems } =
    useGlobalContext();

  const items = getItemByFilter(currentFilter, itemsMap);

  const ifActive = (status) => (currentFilter === status ? "active" : "");

  return (
    <>
      <ul className="items">
        {items.map((item) => {
          return <SingleItem key={item.id} item={item} />;
        })}
        <li className="last-item flex" direction="row">
          <span>{items.length} items left</span>
          <div className="ext flex" direction="row">
            <button
              className={ifActive("all")}
              onClick={() => setCurrentFilter("all")}
            >
              all
            </button>
            <button
              className={ifActive("active")}
              onClick={() => setCurrentFilter("active")}
            >
              active
            </button>
            <button
              className={ifActive("completed")}
              onClick={() => setCurrentFilter("completed")}
            >
              completed
            </button>
          </div>
          <button onClick={() => deleteAllItems()}>clear completed</button>
        </li>
      </ul>

      <div className="last-item-ext ext flex" direction="row">
        <button
          className={ifActive("all")}
          onClick={() => setCurrentFilter("all")}
        >
          all
        </button>
        <button
          className={ifActive("active")}
          onClick={() => setCurrentFilter("active")}
        >
          active
        </button>
        <button
          className={ifActive("completed")}
          onClick={() => setCurrentFilter("completed")}
        >
          completed
        </button>
      </div>
    </>
  );
};
export default Items;
