import TourCard from "./TourCard"
import { TourQuery } from "./ToursForm"

type TourListProps = {
    data:TourQuery
}

const TourList = ({data}:TourListProps) => {
    if(data.length === 0) {
        return <h4 className="text-lg">No tours found...</h4>
    }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {
        data.map((tour) => <TourCard key={tour.id} tour={tour}/>)
    }
    </div>
  )
}

export default TourList