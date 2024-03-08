/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useGlobalContext } from "../context";
import { getItemByFilter } from "../utils";
import SingleItem from "./SingleItem";

const Items = () => {
  const itemsContainerRef = useRef(null);
  const { tasks, currentFilter, setCurrentFilter, deleteAllTasks } =
    useGlobalContext();

  const items = getItemByFilter(currentFilter, tasks);
  const ifActive = (status) => (currentFilter === status ? "active" : "");

  return (
    <>
      <ul className="items" ref={itemsContainerRef}>
        {items.map((item, index) => {
          return (
            <SingleItem
              key={item.id}
              item={item}
              index={index}
              itemsContainerRef={itemsContainerRef}
            />
          );
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
          <button onClick={() => deleteAllTasks()}>clear completed</button>
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
