import { useQuery } from "react-query";
import { StarWarsCharacters, getCharacters } from "./api/Characters";
import { Loading } from "./loading/Loading";
import Card from "./card/Card";
import s from "./App.module.scss";
import Header from "./header/Header";
import { getStarships } from "./api/Starships";
import { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { Button } from "./button/Button";

export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [crew, setCrew] = useState<StarWarsCharacters[]>([]);
  const [passengers, setPassengers] = useState<StarWarsCharacters[]>([]);
  const [page, setPage] = useState<number>(1);
  const debouncedValue = useDebounce<string>(searchTerm, page, 1000);

  const {
    data: charactersData,
    error: charactersError,
    status: charactersStatus,
  } = useQuery(["characters", debouncedValue, page], () =>
    getCharacters(debouncedValue, page)
  );

  const totalCharacters = charactersData?.count || 0;
  const charactersPerPage = 10;

  const {
    data: starshipsData,
    error: starshipsError,
    status: starshipsStatus,
  } = useQuery(["starships"], getStarships);

  if (charactersError !== null) {
    alert("There was an error fetching the character data");
  }

  if (starshipsError !== null) {
    alert("There was an error fetching the starship data");
  }

  const handleAddToCrew = (character: StarWarsCharacters) => {
    const maxCrewLength =
      starshipsData && starshipsData[0] ? parseInt(starshipsData[0].crew) : 0;
    if (crew.length < maxCrewLength) {
      setCrew([...crew, character]);
    } else {
      alert("The maximum number of crew members is " + maxCrewLength);
    }
  };

  const handleAddToPassengers = (character: StarWarsCharacters) => {
    const maxPassengersLength =
      starshipsData && starshipsData[0]
        ? parseInt(starshipsData[0].passengers)
        : 0;
    if (passengers.length < maxPassengersLength) {
      setPassengers([...passengers, character]);
    } else {
      alert("The maximum number of passengers is " + maxPassengersLength);
    }
  };

  // Add toasts

  const handleRemoveFromPassengers = (character: StarWarsCharacters) => {
    setPassengers((prevPassengers) =>
      prevPassengers.filter((p) => p.url !== character.url)
    );
  };

  const handleRemoveFromCrew = (character: StarWarsCharacters) => {
    setCrew((prevCrew) => prevCrew.filter((c) => c.url !== character.url));
  };

  const isLaunchDisabled = () => {
    const maxCrewLength =
      starshipsData && starshipsData[0] ? parseInt(starshipsData[0].crew) : 0;
    const maxPassengersLength =
      starshipsData && starshipsData[0]
        ? parseInt(starshipsData[0].passengers)
        : 0;

    return (
      crew.length < maxCrewLength || passengers.length < maxPassengersLength
    );
  };

  const handleLaunch = () => {
    setCrew([]);
    setPassengers([]);
    setSearchTerm("");
    setPage(1);
    alert("Starship launched!");
  };

  const handleReset = () => {
    setCrew([]);
    setPassengers([]);
    setSearchTerm("");
    setPage(1);
  };

  return charactersStatus === "loading" || starshipsStatus === "loading" ? (
    <Loading />
  ) : (
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
          <Button
            text="Launch"
            handleClick={handleLaunch}
            width="120px"
            disabled={isLaunchDisabled()}
          />
          <Button
            text="Reset"
            handleClick={handleReset}
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
                handleAddToCrew={handleAddToCrew}
                handleAddToPassengers={handleAddToPassengers}
                character={character}
                crew={crew}
                passengers={passengers}
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
            <div className={s.cards}>
              {crew.map((character, index) => (
                <Card
                  key={index}
                  url={character.url.split("/")[5]}
                  avatar={character.avatar}
                  name={character.name}
                  gender={character.gender}
                  birth_year={character.birth_year}
                  character={character}
                  handleRemove={handleRemoveFromCrew}
                />
              ))}
            </div>
          </div>
          <div className={s.passengersSection}>
            {starshipsData ? (
              <h3>
                Passengers (number required: {starshipsData[0]?.passengers})
              </h3>
            ) : (
              <h3>Passengers</h3>
            )}
            <div className={s.cards}>
              {passengers.map((character, index) => (
                <Card
                  key={index}
                  url={character.url.split("/")[5]}
                  avatar={character.avatar}
                  name={character.name}
                  gender={character.gender}
                  birth_year={character.birth_year}
                  character={character}
                  handleRemove={handleRemoveFromPassengers}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
