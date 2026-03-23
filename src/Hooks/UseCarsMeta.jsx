import { useQuery } from "@tanstack/react-query"
import BaseUrl from "./BaseUrl"

const defaultMeta = {
  brands: [],
  models: [],
  conditions: [],
  transmissions: [],
  fuelTypes: [],
  colors: [],
  locations: [],
  bounds: {
    minPrice: 0,
    maxPrice: 0,
    minYear: null,
    maxYear: null,
  },
}

const UseCarsMeta = () => {
  const link = BaseUrl()

  const { data: meta = defaultMeta, isFetching } = useQuery({
    queryKey: ["cars-meta"],
    queryFn: async () => {
      const res = await link.get("/cars/meta")
      return res.data.data
    },
  })

  return [meta, isFetching]
}

export default UseCarsMeta
