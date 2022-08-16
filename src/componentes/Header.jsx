import React, { useState, useContext } from "react";
//Importamos el Contexto
import ThemeContext from '../context/ThemeContext';
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  //Definimos la variable Color con la información que tiene el Provider
  const color = useContext(ThemeContext);
  const handleClick = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className="Header">
      Utilizamos la variable color
      <h1 style={{color}}>React Hooks</h1>
      <button type="button" onClick={handleClick}>{darkMode ? 'DarkMode' : 'Light Mode'}</button>
    </div>
  );
};

export default Header;
