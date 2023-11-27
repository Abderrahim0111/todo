import { Link, NavLink } from "react-router-dom";
import "./appbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import ThemeContexttt from "../context/ThemeContext";

const Appbar = () => {
  const { theme, changeTheme } = useContext(ThemeContexttt);
  const [user] = useAuthState(auth);
  const signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  return (
    <div className="appBar">
      <Link to="/">
        <h1>ToDo-App</h1>
      </Link>
      {theme === "dark" ? (
        <i
          onClick={() => {
            changeTheme(theme);
          }}
          className="fa-solid fa-sun"
        />
      ) : (
        <i
          onClick={() => {
            changeTheme(theme);
          }}
          className="fa-solid fa-moon"
        />
      )}
      <ul>
        
        
        {user && (
          <>
          <li
          onClick={() => {
            signout();
          }}
        >
          Signout
        </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink to="/signin">Signin</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Appbar;
