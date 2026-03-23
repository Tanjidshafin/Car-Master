import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AppContext } from "../context/AppContext"
import { carService } from "../services/carService"

export const useVendorCars = ({ page = 1, limit = 8 } = {}) => {
  const queryClient = useQueryClient()
  const { user, loading } = useContext(AppContext)

  const carsQuery = useQuery({
    queryKey: ["vendor-cars", page, limit],
    enabled: !loading && !!user?.email,
    queryFn: () => carService.getVendorCars({ page, limit }),
  })

  const createCar = useMutation({
    mutationFn: carService.createVendorCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-cars"] }),
  })

  const updateCar = useMutation({
    mutationFn: carService.updateVendorCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-cars"] }),
  })

  const deleteCar = useMutation({
    mutationFn: carService.deleteVendorCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-cars"] }),
  })

  const markSold = useMutation({
    mutationFn: carService.markCarSold,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vendor-cars"] }),
  })

  return { ...carsQuery, createCar, updateCar, deleteCar, markSold }
}
