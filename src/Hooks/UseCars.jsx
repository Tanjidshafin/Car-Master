import { useQuery } from '@tanstack/react-query'
import BaseUrl from './BaseUrl'

const UseCars = (params = {}) => {
    const link = BaseUrl()
    const { data: response = { data: [], total: 0, page: 1, limit: 12, totalPages: 0 }, refetch, isFetching } = useQuery({
        queryKey: ['Allcars', params],
        queryFn: async () => {
            const res = await link.get("/cars", { params })
            return res.data
        }
    })
    return [response.data || [], refetch, isFetching, response]
}

export default UseCars
