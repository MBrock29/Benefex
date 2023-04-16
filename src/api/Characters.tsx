import axios from "axios";

export interface StarWarsCharacters {
  url: string;
  name: string;
  avatar?: HTMLImageElement;
  gender: string;
  birth_year: string;
}

export const getCharacters = (): Promise<StarWarsCharacters[]> =>
  axios
    .get(`${process.env.REACT_APP_BENEFEX_API_URL}/people`)
    .then((res) => res.data.results);
