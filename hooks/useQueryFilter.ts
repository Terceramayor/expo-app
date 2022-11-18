import {useMemo} from "react";
import {useRoute} from "@react-navigation/native";
import {Hotel} from "../types";

export const useQueryFilter = (sourceData: Hotel[]): Hotel[] => {
  const route = useRoute<any>()
  const { query, filter } = route.params || {}
  return useMemo(() => {
    if (query) {
      const regexp = new RegExp(route.params.query, "i");
      if (query?.length) {
        const filteredData = sourceData.filter((data: Hotel) => regexp.test(data.name));
        if (filter) {
          switch (filter?.value) {
            case "price":
              if (filter?.order === "desc") {
                filteredData.sort((a, b) => b.price - a.price);
              }
              filteredData.sort((a, b) => a.price - b.price);
              break;
            case "rating":
              if (filter?.order === "desc") {
                filteredData.sort((a, b) => a.userRating - b.userRating);
              }
              filteredData.sort((a, b) => b.userRating - a.userRating);
              break;
            default:
              break;
          }
        }
        return filteredData;
      }
    }
    return sourceData
  }, [query, filter])
}
