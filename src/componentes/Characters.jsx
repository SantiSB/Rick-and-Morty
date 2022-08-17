//Importamos los Hooks
import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Search";

//Estado inicial
const initialState = {
  favorites: [],
};

//Reducer
const favoriteReducer = (state, action) => {
  //Switch
  switch (action.type) {
    //Caso 1
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    //Caso por default
    default:
      return state;
  }
};
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  //useReducer para la variable Favorites, Parametros: (Reducer, Estado Inicial)
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  //Creamos una referencia con useRef
  const searchInput = useRef(null);

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

  //Cambia el useState de search cuando un usuario escribe en el input
  //Utilizamos searchInput que es la Referencia creada con useRef, asi no necesitamos recibir un evento como parametro
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  //La misma función anterior pero con useCallback
  const handleSearch = useCallback(()=>{
    setSearch(searchInput.current.value)
  }, [])

  //Función que filtra los charecters que tienen un nombre que coinicide con la busqueda en el Input (Sin importar mayusculas o minusculas)
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  // Función con useMemo que filtra los charecters que tienen un nombre que coinicide con la busqueda en el Input (Sin importar mayusculas o minusculas)
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    //Parámetro que va a escuchar los Characters y Search
    [characters, search]
  );

  return (
    <div className="Characters">
      {/* Haga un mapeo de la variable favorites de InitialState */}
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      {/* Pasamos al componente search los parametros que requiere */}
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {/* Haga un mapeo de la variable filteredUsers de la función que filtra los resultados de busqueda */}
      {filteredUsers.map((character) => (
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
