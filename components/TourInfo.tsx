import { TourInfoProps } from "@/utils/action";

type TourProps = {
  tour: TourInfoProps;
};
const TourInfo = ({ tour }: TourProps) => {
  const { title, description, stops } = tour;
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="leading-loose">{description}</p>
      <ul>
        {stops.map((stop) => {
          return (
            <li className="bg-base-100 rounded-xl p-4 mb-4">
              <p>{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TourInfo;
