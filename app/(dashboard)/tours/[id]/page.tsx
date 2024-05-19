import TourInfo from "@/components/TourInfo";
import { getSingleTour, getTourImage } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

type SingleTourPageProps = {
  params: {
    id: string;
  };
};

const SingleTourPage = async ({ params }: SingleTourPageProps) => {
  const { id } = params;
  const tour = await getSingleTour(id);
  if (!tour) {
    redirect("/tours");
  }
  //   const tourImage = await getTourImage(tour.city,tour.country)
  const {data} = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw
  return (
    <div>
      <Link href="/tours" className="btn btn-primary uppercase mb-12">
        back to tours
      </Link>
      {tourImage && (
        <Image
          src={tourImage}
          width={300}
          height={300}
          className="rounded-xl shadow-xl h-96 w-96 object-cover mb-16"
          alt={tour.title}
          priority
        />
      )}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
