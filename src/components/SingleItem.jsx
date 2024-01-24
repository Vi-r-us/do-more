/* eslint-disable react/prop-types */
import iconCheck from "../assets/icon-check.svg";
import iconCross from "../assets/icon-cross.svg";
import { useGlobalContext } from "../context";

const SingleItem = ({ item }) => {
  const { editItem, deleteItem } = useGlobalContext();
  const { isDone, title, id } = item;

  return (
    <li className="single-item flex" direction="row">
      <button
        className={`checkbox ${isDone && "checked"}`}
        onClick={() => editItem(id)}
      >
        <img src={iconCheck} />
      </button>
      <p className={isDone ? "completed" : ""}>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </p>
      <button
        className="remove-btn"
        type="button"
        onClick={() => deleteItem(id)}
      >
        <img src={iconCross} />
      </button>
    </li>
  );
};
export default SingleItem;
