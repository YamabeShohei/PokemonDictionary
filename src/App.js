import "./App.css";
import { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      const res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(
      data.map((pokemon) => {
        return getPokemon(pokemon.url);
      })
    );
    setPokemonData(pokemonData);
  };

  const handlePrevPage = async () => {
    if (prevUrl === null) {
      return;
    }

    setLoading(true);
    const data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    if (nextUrl === null) {
      return;
    }

    setLoading(true);
    const data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="pokemonDataContainer">
              {pokemonData.map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon}></Card>;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
