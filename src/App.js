import { useState, useEffect } from "react";
import "./App.css"
import {getAllPokemon, getPokemon} from "./utils/pokemon"

function App(){
    const initialURL = 'https://pokeapi.co/api/v2/pokemon';
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            const res = await getAllPokemon(initialURL);
            loadPokemon(res.results);
            setLoading(false);
        }

        fetchPokemonData();
    }, [])

    const loadPokemon = async (data) => {
        const pokemonData = await Promise.all(data.map((pokemon) => {
            return getPokemon(pokemon.url);
        }));
        setPokemonData(pokemonData);
    }

    return <div className="App">
        {loading ? (
            <h1>ロード中</h1>
        ): (
            <>
            <h1>データを取得しました</h1>
            </>
        )}
    </div>
}

export default App;
