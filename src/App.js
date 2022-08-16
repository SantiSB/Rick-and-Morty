import React from 'react'
import Characters from "./componentes/Characters";
import Header from "./componentes/Header";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Header />
      <Characters />
      <h1>Hola Mundo</h1>
    </div>
  );
}

export default App;
