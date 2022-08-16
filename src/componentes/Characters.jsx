//Importamos los Hooks
import React, { useState, useEffect, useReducer } from "react";

//Estado inicial
const initialState = {
  favorites: [],
};

//Reducer
const favoriteReducer = (state, action) => {
  //Switch
  switch (action.type) {
    //Caso 1
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    //Caso por default
    default:
      return state;
  }
};
const Characters = () => {
  const [characters, setCharacters] = useState([]);

  //useReducer para la variable Favorites, Parametros: (Reducer, Estado Inicial)
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    //Petición fetch
    fetch("https://rickandmortyapi.com/api/character")
      //Entonces la respuesta conviertala a json
      .then((response) => response.json())
      //Entonces esos los resultados de esos datos envielos a la variable del estado characters
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = (favorite) => {
    //Llama al dispactch, le entrega el tipo de acción a realizar y el payload con la información a actualizar
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  return (
    <div className="Characters">
      {/* Haga un mapeo de la variable favorites de InitialState */}
      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

        {/* Haga un mapeo de la variable characters de useState */}
      {characters.map((character) => (
        //Renderizamos un item con un ID diferente
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          {/* Boton que invoca la función que agrega a favoritos (Le envía un Character) */}
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a Favoritos
          </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;
