import axios, { AxiosResponse } from "axios";

export interface StarWarsCharacters {
  url: string;
  name: string;
  avatar: HTMLImageElement;
  gender: string;
  birth_year: string;
  count?: number;
}

export const getCharacters = async (
  searchTerm: string,
  page: number
): Promise<{ characters: StarWarsCharacters[]; count: number }> =>
  axios
    .get(
      `${process.env.REACT_APP_BENEFEX_API_URL}/people/?search=${searchTerm}&page=${page}`
    )
    .then((res: AxiosResponse) => ({
      characters: res.data.results,
      count: res.data.count,
    }));
