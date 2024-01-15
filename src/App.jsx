/* eslint-disable no-unused-vars */
import { ToastContainer } from "react-toastify";
import { nanoid } from "nanoid";
import { useState } from "react";
// Components
import Form from "./components/Form";
import Items from "./components/Items";
// Images
import bgDesktopLight from "./assets/bg-desktop-light.jpg";
import bgMobileLight from "./assets/bg-mobile-light.jpg";
import bgDesktopDark from "./assets/bg-desktop-dark.jpg";
import bgMobileDark from "./assets/bg-mobile-dark.jpg";
import iconSun from "./assets/icon-sun.svg";
import iconMoon from "./assets/icon-moon.svg";

const defaultItems = [
  { id: nanoid(), title: "walk the dog", isDone: false },
  { id: nanoid(), title: "wash dishes", isDone: false },
  { id: nanoid(), title: "drink coffee", isDone: true },
  { id: nanoid(), title: "take a nap", isDone: false },
];
const App = () => {
  const [items, setItems] = useState(defaultItems);
  return (
    <>
      <picture className="bg-image">
        <img src={bgDesktopLight} alt="background image" />
      </picture>

      <main className="content-center flex" direction="col">
        <section className="heading-section flex" direction="row">
          <h1 className="app-heading">todo</h1>
          <img src={iconMoon} className="theme-switch" alt="switch theme" />
        </section>

        <section className="main-section flex" direction="col">
          <ToastContainer position="top-center" />
          <Form />
          <Items items={items} />
        </section>

        <p>Drag and drop to reorder list</p>
      </main>
    </>
  );
};
export default App;
