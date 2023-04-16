import { StarWarsCharacters } from "../api/Characters";
import s from "./Card.module.scss";

const Card: React.FC<StarWarsCharacters> = ({
  url,
  name,
  gender,
  birth_year,
}) => {
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
    </div>
  );
};

export default Card;
