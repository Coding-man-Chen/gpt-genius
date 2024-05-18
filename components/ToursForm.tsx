'use client'
import { getAllTours } from "@/utils/action"
import { useQuery } from "@tanstack/react-query"
import TourList from "./TourList"

export type TourQuery = Awaited<ReturnType<typeof getAllTours>>

const ToursForm = () => {
    const {data,isPending} = useQuery<TourQuery>({
        queryKey:['tasks'],
        queryFn: () => getAllTours()
    })
  return (
    <>
        {
            isPending ? <span className="loading"></span> : <TourList data={data as TourQuery}/>
        }
    </>
  )
}

export default ToursForm