import { API_KEY, API_HOST } from "@env";
import axios from "axios";

const options = {
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": API_HOST,
  },
};

export { options };
