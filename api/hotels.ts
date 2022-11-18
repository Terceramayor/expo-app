import axios, { AxiosError } from "axios";

const getHotelsDetails = async () => {
  return axios.get(
    "https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507"
  );
};

export { getHotelsDetails };
