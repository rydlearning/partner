import { useQuery } from "react-query";
import { getCountries, getDialCodes, getTimezones } from "../api/thirdParty";

export const useGetCountries = () => {
  return useQuery(["getCountries"], getCountries);
};

export const useGetTimezones = (countryCode: string | null) => {
  return useQuery(["getTimeZones", countryCode], () =>
    getTimezones(countryCode)
  );
};

export const useGetDialCodes = () => {
  return useQuery(["getDialCode"], getDialCodes);
};
