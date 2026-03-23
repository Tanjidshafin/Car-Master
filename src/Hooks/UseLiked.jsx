import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import BaseUrl from './BaseUrl'
import { AppContext } from '../context/AppContext'

const UseLiked = () => {
    const link = BaseUrl()
    const { user} = useContext(AppContext)
    const { data: favCars = [], refetch, isFetching } = useQuery({
        queryKey: ["favCars", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await link.get(`/fav-cars?email=${user?.email}`)
            return res.data.data
        }
    })
    return [favCars, refetch, isFetching]
}

export default UseLiked
