import { useQuery } from '@tanstack/react-query'
import BaseUrl from './BaseUrl'

const UseCars = () => {
    const link = BaseUrl()
    const { data: Allcars = [], refetch, isFetching } = useQuery({
        queryKey: ['Allcars'],
        queryFn: async () => {
            const res = await link.get("/cars")
            return res.data
        }
    })
    return [Allcars, refetch, isFetching]
}

export default UseCars