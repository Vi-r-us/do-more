/* eslint-disable react/prop-types */
import iconCheck from "../assets/icon-check.svg";
import iconCross from "../assets/icon-cross.svg";

const SingleItem = ({ item }) => {
  return (
    <li className="single-item flex" direction="row">
      <span
        className={`checkbox ${item.isDone && "checked"}`}
        onClick={() => console.log("edit task")}
      >
        <img src={iconCheck} />
      </span>
      <p className={item.isDone ? "completed" : ""}>
        {item.title}
      </p>
      <button
        className="remove-btn"
        type="button"
        onClick={() => console.log("delete task")}
      >
        <img src={iconCross} />
      </button>
    </li>
  );
};
export default SingleItem;
