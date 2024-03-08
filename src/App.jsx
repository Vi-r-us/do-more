/* eslint-disable no-unused-vars */
import { ToastContainer } from "react-toastify";
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
import { useGlobalContext } from "./context";

const App = () => {
  const { isLoading, isDarkTheme, toggleDarkTheme } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="middle">
        <svg
          height="100"
          stroke="url(#MyGradient)"
          strokeWidth="2"
          className="text-line"
          width="100%"
        >
          <defs>
            <linearGradient id="MyGradient">
              <stop offset="25%" stopColor="#57ddff" />
              <stop offset="75%" stopColor="#c058f3" />
            </linearGradient>
          </defs>
          <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">
            #DoMore
          </text>
        </svg>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        theme={isDarkTheme ? "dark" : "light"}
      />
      <picture className="bg-image">
        <source
          media="(min-width:540px)"
          srcSet={isDarkTheme ? bgDesktopDark : bgDesktopLight}
        ></source>
        <img
          src={isDarkTheme ? bgMobileDark : bgMobileLight}
          alt="background image"
        />
      </picture>

      <main className="content-center flex" direction="col">
        <section className="heading-section flex" direction="row">
          <h1 className="app-heading">todo</h1>
          <div>
            <img
              src={isDarkTheme ? iconSun : iconMoon}
              className="theme-switch"
              alt="switch theme"
              onClick={toggleDarkTheme}
            />
          </div>
        </section>

        <section className="main-section flex" direction="col">
          <Form />
          <Items />
        </section>

        <p>Drag and drop to reorder list</p>
      </main>
    </>
  );
};

export default App;
