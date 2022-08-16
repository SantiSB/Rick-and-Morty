import React, { useState, useEffect } from "react";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    //Petición fetch
    fetch("https://rickandmortyapi.com/api/character")
      //Entonces la respuesta conviertala a json
      .then((response) => response.json())
      //Entonces esos los resultados de esos datos envielos a la variable del estado characters
      .then((data) => setCharacters(data.results));
  }, []);
  return (
    <div className="Characters">
      {/* Haga un mapeo de la variable de estado characters y por cada character retorne un h2 con el nombre del character */}
      {characters.map((character) => (
        <h2>{character.name}</h2>
      ))}
    </div>
  );
};

export default Characters;
