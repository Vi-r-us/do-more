/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  getUserPreferenceTheme,
  setLocalStorage,
} from "./utils";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const AppContext = React.createContext();
const defaultItems = getLocalStorage();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getUserPreferenceTheme());
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState(defaultItems);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [dragTaskIndex, setDragTaskIndex] = useState();

  // Setting the preferred theme by user
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 3500);
    }
  }, [isLoading]);

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    // Set the theme preference in local storage
    localStorage.setItem("dark-theme", newTheme);
  };

  // Function to add a new task
  const addTask = (taskTitle) => {
    // Create a new task object with a unique id using nanoid
    const newTask = { id: nanoid(), title: taskTitle, isDone: false };
    // Add the new task to the existing tasks array
    const updatedTasks = [...tasks, newTask];
    // Update the tasks state with the new array of tasks
    setTasks(updatedTasks);
    // Update the local storage with the updated tasks
    setLocalStorage(updatedTasks);
    // Show a success toast message
    toast.success("Task added successfully");
  };

  // Function to toggle the 'isDone' property of a task
  const editTask = (id) => {
    // Map through the tasks array and update the 'isDone' property of the task with the matching id
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    // Update the tasks state with the updated array of tasks
    setTasks(updatedTasks);
    // Update the local storage with the updated tasks
    setLocalStorage(updatedTasks);
  };

  // Function to delete a task by its id
  const deleteTask = (id) => {
    // Filter out the task with the matching id from the tasks array
    const updatedTasks = tasks.filter((task) => task.id !== id);
    // Update the tasks state with the updated array of tasks
    setTasks(updatedTasks);
    // Update the local storage with the updated tasks
    setLocalStorage(updatedTasks);
  };

  // Function to delete all tasks
  const deleteAllTasks = () => {
    // Create an empty array of tasks
    const updatedTasks = [];
    // Update the tasks state with the empty array of tasks
    setTasks(updatedTasks);
    // Update the local storage with the empty array of tasks
    setLocalStorage(updatedTasks);
  };

  // Drag functions handlers
  const handleDragStart = (e, index, itemsContainerRef) => {
    // Check for left mouse button
    if (!detectLeftButton(e)) return;
    setDragTaskIndex(index);

    const container = itemsContainerRef?.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter(
      (item, i) => i !== index && !item.classList.contains("last-item")
    );
    const dragItemData = tasks[index];
    let updatedTasks = [...tasks];

    // Get the bounding rectangle of the dragged item
    const dragBoundingRect = dragItem.getBoundingClientRect();
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    // Get the bounding rectangle of the dragged item
    const tempItemDiv = document.createElement("div");
    tempItemDiv.id = "temp-item";
    tempItemDiv.style.width = dragBoundingRect.width + "px";
    tempItemDiv.style.height = dragBoundingRect.height + "px";
    tempItemDiv.style.pointerEvents = "none";
    container.appendChild(tempItemDiv);

    const distance = dragBoundingRect.height;
    itemsBelowDragItem[0].style.borderTop = "1px solid var(--clr-text-200)";
    itemsBelowDragItem.forEach(
      (item) => (item.style.transform = `translateY(${distance}px)`)
    );

    const x = e.clientX;
    const y = e.clientY;
    document.onpointermove = dragMove;

    // Handle the drag movement
    function dragMove(e) {
      const posX = e.clientX - x;
      const posY = e.clientY - y;
      dragItem.style.transform = `translateX(${posX}px) translateY(${posY}px)`;

      notDragItems.forEach((item) => {
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;
        if (isOverlapping) {
          if (item.getAttribute("style")) {
            item.style = "";
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            item.style.borderTop = "1px solid var(--clr-text-200)";
            index--;
          }
        }

        updatedTasks = tasks.filter((task) => task.id !== dragItemData.id);
        updatedTasks.splice(index, 0, dragItemData);
      });
    }

    // Handle the end of drag
    document.onpointerup = dragEnd;
    function dragEnd() {
      document.onpointerup = "";
      document.onpointermove = "";
      setDragTaskIndex(undefined);
      dragItem.style = "";
      container.removeChild(tempItemDiv);
      items.forEach((item) => (item.style = ""));
      setTasks(updatedTasks);
      setLocalStorage(updatedTasks);
    }
  };

  /**
   * Function to detect if the left mouse button is pressed
   * @param {Event} e - The event object
   * @returns {boolean} - True if the left mouse button is pressed, false otherwise
   */
  const detectLeftButton = (e) => {
    e = e || window.event; // Use the event object or the window event if not available
    if (
      e.target.tagName.toLowerCase() === "button" || // Check if the target element is a button
      e.target.tagName.toLowerCase() === "img" // Check if the target element is an image
    )
      return false; // Return false if the target is a button or image
    if ("buttons" in e) return e.buttons === 1; // Check if the buttons property is available in the event object and return true if the left button is pressed

    let button = e.which || e.button; // Get the button value from the event object
    return button === 1; // Return true if the left mouse button is pressed
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        tasks,
        currentFilter,
        isDarkTheme,
        setTasks,
        setCurrentFilter,
        toggleDarkTheme,

        // Client-side function
        addTask,
        editTask,
        deleteTask,
        deleteAllTasks,

        // Drag-side function
        dragTaskIndex,
        handleDragStart,
      }}
    >
      {children}?
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
