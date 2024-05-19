'use client'
import { getAllTours } from "@/utils/action"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import TourList from "./TourList"

export type TourQuery = Awaited<ReturnType<typeof getAllTours>>

const ToursForm = () => {
    const [searchValue, setSearchValue] = useState('')
    const {data,isPending} = useQuery<TourQuery>({
        queryKey:['tours',searchValue],
        queryFn: () => getAllTours(searchValue)
    })
  return (
    <>
        <form className="join max-w-lg mb-12 flex">
          <input type="text" placeholder="enter city or country here" className="input input-bordered join-item flex-1" required value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
          <button className="btn btn-primary join-item uppercase" onClick={() => setSearchValue('')} disabled={isPending}>reset</button>
        </form>
        {
            isPending ? <span className="loading"></span> : <TourList data={data as TourQuery}/>
        }
    </>
  )
}

export default ToursForm