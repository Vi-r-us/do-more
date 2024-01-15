import { useState } from "react";
import iconCheck from "../assets/icon-check.svg";

const Form = () => {
  const [newItemName, setNewItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="form-control flex" direction="row" onSubmit={handleSubmit}>
      <span className="checkbox">
        <img src={iconCheck} />
      </span>
      <textarea
        type="text"
        className="text-input"
        placeholder="Create a new todo..."
        value={newItemName}
        onChange={(event) => setNewItemName(event.target.value)}
      />
      {/* <button type='submit' className='btn'>
          add task
        </button> */}
    </form>
  );
};
export default Form;
