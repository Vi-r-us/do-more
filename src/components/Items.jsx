/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useGlobalContext } from "../context";
import { getItemByFilter } from "../utils";
import SingleItem from "./SingleItem";

const Items = () => {
  const {
    itemsMap,
    currentFilter,
    allItems,
    allActiveItems,
    allCompletedItems,
  } = useGlobalContext();

  const items = getItemByFilter(currentFilter, itemsMap);

  return (
    <>
      <ul className="items">
        {items.map((item) => {
          return <SingleItem key={item.id} item={item} />;
        })}
        <li className="last-item flex" direction="row">
          <span>{items.length} items left</span>
          <div className="ext flex" direction="row">
            <button onClick={() => allItems()}>all</button>
            <button onClick={() => allActiveItems()}>active</button>
            <button onClick={() => allCompletedItems()}>completed</button>
          </div>
          <button>clear completed</button>
        </li>
      </ul>

      <div className="last-item-ext ext flex" direction="row">
        <button onClick={() => allItems()}>all</button>
        <button onClick={() => allActiveItems()}>active</button>
        <button onClick={() => allCompletedItems()}>completed</button>
      </div>
    </>
  );
};
export default Items;
