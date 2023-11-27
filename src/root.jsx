import { Outlet } from "react-router-dom";
import Appbar from "./components/appbar";
import { useContext } from "react";
import ThemeContexttt from "./context/ThemeContext";

const Root = () => {
  const { theme } = useContext(ThemeContexttt);
  return (
    <div className={`${theme}`}>
      <Appbar />

      <main
        style={{
          minHeight: "calc(100vh - 61px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
