/* eslint-disable react/prop-types */
import {} from "react";
import iconCheck from "../assets/icon-check.svg";
import iconCross from "../assets/icon-cross.svg";
import { useGlobalContext } from "../context";

const SingleItem = ({ item, index, itemsContainerRef }) => {
  const { editTask, deleteTask } = useGlobalContext();
  const { dragTaskIndex, handleDragStart } = useGlobalContext();
  const { isDone, title, id } = item;

  return (
    <li
      className={`${
        dragTaskIndex === index ? "dragging" : ""
      } single-item flex`}
      direction="row"
      onPointerDown={(e) => handleDragStart(e, index, itemsContainerRef)}
    >
      <button
        className={`checkbox ${isDone && "checked"}`}
        onClick={() => editTask(id)}
      >
        <img src={iconCheck} />
      </button>
      <p className={isDone ? "completed" : ""}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </p>
      <button
        className="remove-btn"
        type="button"
        // disabled
        // style={{cursor: "not-allowed"}}
        onClick={() => deleteTask(id)}
      >
        <img src={iconCross} />
      </button>
    </li>
  );
};
export default SingleItem;
