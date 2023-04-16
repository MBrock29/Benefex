import { StarWarsCharacters } from "../api/Characters";
import { Button } from "../button/Button";
import s from "./Card.module.scss";

export interface CharacterExtras extends StarWarsCharacters {
  handleAddToCrew?: (characters: StarWarsCharacters) => void;
  handleAddToPassengers?: (characters: StarWarsCharacters) => void;
  character: StarWarsCharacters;
  crew?: StarWarsCharacters[];
  passengers?: StarWarsCharacters[];
  handleRemove?: (characters: StarWarsCharacters) => void;
}

const Card: React.FC<CharacterExtras> = ({
  url,
  name,
  gender,
  birth_year,
  handleAddToCrew,
  handleAddToPassengers,
  character,
  crew,
  passengers,
  handleRemove,
}) => {
  const isInCrewOrPassengers = () => {
    if (!crew || !passengers) {
      return undefined;
    }
    return (
      crew.some((crewMember) => crewMember.url === character.url) ||
      passengers.some((passenger) => passenger.url === character.url)
    );
  };

  return (
    <div className={s.container}>
      <img
        className={s.image}
        src={require(`../../images/${url}.jpg`)}
        alt="Avatar"
      />
      <h4 className={s.name}>{name}</h4>
      <h4 className={s.gender}>{gender}</h4>
      <p className={s.birth_year}>{birth_year}</p>
      {handleAddToCrew && (
        <Button
          text="Add as crew"
          handleClick={() => handleAddToCrew(character)}
          disabled={isInCrewOrPassengers()}
          width="100%"
        />
      )}
      {handleAddToPassengers && (
        <Button
          variant="secondary"
          text="Add as passenger"
          handleClick={() => handleAddToPassengers(character)}
          disabled={isInCrewOrPassengers()}
          width="100%"
        />
      )}
      {handleRemove && (
        <Button
          variant="danger"
          text="Delete"
          handleClick={() => handleRemove(character)}
          width="100%"
        />
      )}
    </div>
  );
};

export default Card;
