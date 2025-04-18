import axios from "axios";

export const getCountries = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/states"
    );
    return response;
  } catch (error) {
    console.error("Error fetching countries", error);
  }
};

export const getTimezones = async (countryCode: string | null) => {
  try {
    const response = await axios.get(
      `https://api.timezonedb.com/v2.1/list-time-zone?key=N5QIGU6TU183&format=json&country=${countryCode}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching timezones", error);
  }
};

export const getDialCodes = async () => {
  try {
    const response = await axios.get(
      `https://countriesnow.space/api/v0.1/countries/codes`
    );
    return response;
  } catch (error) {
    console.error("Error fetching dial codes", error);
  }
};