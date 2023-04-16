import React, { useState } from "react";
import s from "./App.module.scss";
import { StarWarsCharacters, getCharacters } from "./api/Characters";
import { getStarships } from "./api/Starships";
import { useQuery } from "react-query";
import useDebounce from "./hooks/useDebounce";
import { Button } from "./button/Button";
import Card from "./card/Card";
import Header from "./header/Header";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedValue = useDebounce<string>(searchTerm, page, 1000);

  const {
    data: charactersData,
    error: charactersError,
    status: charactersStatus,
  } = useQuery(["characters", debouncedValue, page], () =>
    getCharacters(debouncedValue, page)
  );

  console.log(charactersData);

  const {
    data: starshipsData,
    error: starshipsError,
    status: starshipsStatus,
  } = useQuery(["starships"], getStarships);

  const totalCharacters = charactersData?.count || 0;
  const charactersPerPage = 10;

  console.log(starshipsData);

  if (charactersError !== null) {
    alert("There was an error fetching the character data");
  }

  if (starshipsError !== null) {
    alert("There was an error fetching the starship data");
  }

  // Add Toasts

  return (
    <div className={s.App}>
      <div className={s.header}>
        <Header starshipData={starshipsData && starshipsData[0]?.name} />
        <div className={s.headerContainer}>
          <input
            className={s.input}
            type="input"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          ></input>
          <Button text="Launch" handleClick={() => {}} width="120px" />
          <Button
            text="Reset"
            handleClick={() => {}}
            width="120px"
            variant="secondary"
          />
        </div>
      </div>
      <div className={s.container}>
        <div className={s.leftSection}>
          <div className={s.pagination}>
            <Button
              text="Previous Page"
              handleClick={() =>
                setPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={page === 1}
            />

            <Button
              variant="secondary"
              text="Next Page"
              handleClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page * charactersPerPage >= totalCharacters}
            />
          </div>

          <div className={s.cardsContainer}>
            {charactersData?.characters.map((character, index) => (
              <Card
                key={index}
                url={character.url.split("/")[5]}
                avatar={character.avatar}
                name={character.name}
                gender={character.gender}
                birth_year={character.birth_year}
              />
            ))}
          </div>
        </div>

        <div className={s.rightSection}>
          <div className={s.crewSection}>
            {starshipsData ? (
              <h3>Crew (number required: {starshipsData[0]?.crew})</h3>
            ) : (
              <h3>Crew</h3>
            )}
            <div className={s.cards}></div>
          </div>
          <div className={s.passengersSection}>
            {starshipsData ? (
              <h3>
                Passengers (number required: {starshipsData[0]?.passengers})
              </h3>
            ) : (
              <h3>Passengers</h3>
            )}
            <div className={s.cards}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
