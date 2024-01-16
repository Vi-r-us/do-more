import { useEffect, useRef, useState } from "react";
import iconCheck from "../assets/icon-check.svg";

const Form = () => {
  const txHeight = 20;
  const [newItemName, setNewItemName] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${txHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, []);

  const handleTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 0;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

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
        ref={textareaRef}
        value={newItemName}
        onInput={() => handleTextareaHeight()}
        onChange={(event) => setNewItemName(event.target.value)}
      />
      {/* <button type='submit' className='btn'>
          add task
        </button> */}
    </form>
  );
};
export default Form;
