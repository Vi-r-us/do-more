import { useEffect, useRef, useState } from "react";
import iconCheck from "../assets/icon-check.svg";
import { useGlobalContext } from "../context";

const Form = () => {
  const { addItem } = useGlobalContext();
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
    if (
      newItemName === null ||
      newItemName === undefined ||
      newItemName.trim().length === 0
    ) {
      // handleTextareaHeight();
      textareaRef.current.style.height = `${txHeight}px`;
      console.log("press enter");
      setNewItemName("");
      return;
    }

    if (e.keyCode == 13 && e.shiftKey == false) {
      // if (newItemName === '') return;
      addItem(newItemName);
      setNewItemName("");
      e.preventDefault();
    }
  };

  return (
    <form className="form-control flex" direction="row">
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
        onKeyDown={handleSubmit}
        onChange={(event) => setNewItemName(event.target.value)}
      />
      {/* <button type='submit' className='btn'>
          add task
        </button> */}
      {/* <p>{newItemName}</p> */}
    </form>
  );
};
export default Form;
