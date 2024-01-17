/* eslint-disable no-unused-vars */
import { ToastContainer } from "react-toastify";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
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
import axios from "axios";

const App = () => {

  return (
    <>
      <picture className="bg-image">
        <source media="(min-width:540px)" srcSet={bgDesktopLight}></source>
        <img src={bgMobileLight} alt="background image" />
      </picture>

      <main className="content-center flex" direction="col">
        <section className="heading-section flex" direction="row">
          <h1 className="app-heading">todo</h1>
          <img src={iconMoon} className="theme-switch" alt="switch theme" />
        </section>

        <section className="main-section flex" direction="col">
          {/* <ToastContainer position="top-center" /> */}
          <Form />
          <Items />
        </section>

        <p>Drag and drop to reorder list</p>
      </main>
    </>
  );
};
export default App;
