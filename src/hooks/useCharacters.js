import {useState, useEffect} from 'react'

const useCharacters = url => {
    //useState para guardar los personajes o characters
    const [characters, setCharacters] = useState([]);
    //useEffect con la petición a la URL de los personajes o Characters
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => setCharacters(data.results))
    }, [url]);
    return characters;
}

export default useCharacters