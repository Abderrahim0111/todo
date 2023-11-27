import { createContext, useReducer } from "react";
  const ThemeContexttt = createContext();
 
 const initialData = { theme: localStorage.getItem("myTheme")===null ? "light" : localStorage.getItem("myTheme")};
 const reducer = (firstState, action) => {
    switch (action.type) {
      case "CHANGE_THEME":
        return { ...firstState, theme: action.newValue };
      default:
        return firstState;
    }}
  
  // eslint-disable-next-line react/prop-types
  export function ThemeProvider({ children }) {
    const [firstState, dispatch] = useReducer(reducer, initialData);
    const changeTheme = (theme) => {
        localStorage.setItem("myTheme", theme==="light" ? "dark" : "light")
        dispatch({ type: "CHANGE_THEME", newValue: theme==="light" ? "dark" : "light" });
      };
  
    return (
       <ThemeContexttt.Provider value={{ ...firstState, changeTheme}}>
        {children}
       </ThemeContexttt.Provider>
    );
  }
  
  export default ThemeContexttt;