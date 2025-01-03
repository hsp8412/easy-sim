import httpService from "./httpService";
import {Country} from "@/types/country";

export const getCountryByID = async () => {
  try {
    const response = await httpService.get<Country>(
      "api/countries/get-countries-by-id"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCountries = async () => {
  try {
    const response = await httpService.get<Country[]>(
      "api/country/get-all-countries"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
