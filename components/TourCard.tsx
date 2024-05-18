import Link from "next/link"
import { ElementType } from "react"
import { TourQuery } from "./ToursForm"
type TourCardProps = {
    tour: TourQuery[0]
}
const TourCard = ({tour}:TourCardProps) => {
    const {city, id, country} = tour
  return (
    <Link href={`/tours/${id}`} className="card card-compact rounded-xl bg-base-100">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-center">
                {city},{country}
            </h2>
        </div>
    </Link>
  )
}

export default TourCard