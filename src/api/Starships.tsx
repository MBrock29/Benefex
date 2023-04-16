import axios, { AxiosResponse } from "axios";

export interface StarWarsStarships {
  id: number;
  name: string;
  avatar: HTMLImageElement;
  crew: string;
  passengers: string;
}

export const getStarships = (): Promise<StarWarsStarships[]> =>
  axios
    .get(
      `${process.env.REACT_APP_BENEFEX_API_URL}/starships/?search=Millennium Falcon`
    )
    .then((res: AxiosResponse) => res.data.results);
