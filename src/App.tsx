import React from "react";
import "./App.module.scss";
import { StarWarsCharacters, getCharacters } from "./api/Characters";
import { getStarships } from "./api/Starships";
import { useQuery } from "react-query";

const App = () => {
  const {
    data: charactersData,
    error: charactersError,
    status: charactersStatus,
  } = useQuery(["characters"], getCharacters);

  console.log(charactersData);

  const {
    data: starshipsData,
    error: starshipsError,
    status: starshipsStatus,
  } = useQuery(["starships"], getStarships);

  console.log(starshipsData);

  if (charactersError !== null) {
    alert("There was an error fetching the character data");
  }

  if (starshipsError !== null) {
    alert("There was an error fetching the starship data");
  }

  return <div className="App"></div>;
};

export default App;
