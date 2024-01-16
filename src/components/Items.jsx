/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SingleItem from "./SingleItem";
const Items = ({ items }) => {
  return (
    <>
      <ul className="items">
        {items.map((item) => {
          return <SingleItem key={item.id} item={item} />;
        })}
        <li className="last-item flex" direction="row">
          <span>5 items left</span>
          <div className="ext flex" direction="row">
            <span>all</span>
            <span>active</span>
            <span>completed</span>
          </div>
          <span>clear completed</span>
        </li>
      </ul>
      <div className="last-item-ext ext flex" direction="row">
        <span>all</span>
        <span>active</span>
        <span>completed</span>
      </div>
    </>
  );
};
export default Items;
