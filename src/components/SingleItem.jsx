/* eslint-disable react/prop-types */
import iconCheck from "../assets/icon-check.svg";
import iconCross from "../assets/icon-cross.svg";
import { useGlobalContext } from "../context";

const SingleItem = ({ item }) => {
  const { editItem, deleteItem } = useGlobalContext();

  return (
    <li className="single-item flex" direction="row">
      <button
        className={`checkbox ${item.isDone && "checked"}`}
        onClick={() => editItem(item.id)}
      >
        <img src={iconCheck} />
      </button>
      <p className={item.isDone ? "completed" : ""}>{item.title}</p>
      <button
        className="remove-btn"
        type="button"
        onClick={() => deleteItem(item.id)}
      >
        <img src={iconCross} />
      </button>
    </li>
  );
};
export default SingleItem;
