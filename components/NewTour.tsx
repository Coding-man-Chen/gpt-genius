"use client";
import { FormEvent } from "react";
import TourInfo from "./TourInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  generateTourResponse,
  createTour,
  getExistingTour,
  fetchUserTokensById,
  substractTokens,
} from "@/utils/action";
import { type TourQueryProps } from "@/utils/action";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const {
    mutate,
    data: tour,
    isPending,
  } = useMutation({
    mutationFn: async (destination: TourQueryProps) => {
      const capitalizeDestination: TourQueryProps = {
        city:
          destination.city.charAt(0).toUpperCase() + destination.city.slice(1),
        country:
          destination.country.charAt(0).toUpperCase() +
          destination.country.slice(1),
      };
      const existingTour = await getExistingTour(capitalizeDestination);
      if (existingTour) {
        return existingTour;
      }
      const currentTokens = await fetchUserTokensById(userId!);
      if (!currentTokens || currentTokens < 300) {
        toast.error("Tokens balance too low...");
        return null
      }
      const newTour = await generateTourResponse(capitalizeDestination);
      if (!newTour) {
        toast.error("No matching city found...");
        return null;
      } else {
        await createTour(newTour.tour);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        const newTokens = await substractTokens(userId!,newTour.tokens!)
        toast.success(`${newTokens} tokens remaining...`)
        return newTour.tour;
      }
    },
    onSuccess: (data) => {
      if (data) {
        return data;
      }
      return null;
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination as TourQueryProps);
  };
  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <div className="space-y-8">
      <form className="max-w-3xl" onSubmit={handleSubmit}>
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join flex w-full">
          <input
            type="text"
            className="input input-bordered join-item flex-1"
            placeholder="city"
            name="city"
            required
          />
          <input
            type="text"
            className="input input-bordered join-item flex-1"
            placeholder="country"
            name="country"
            required
          />
          <button type="submit" className="btn btn-primary join-item">
            generate tour
          </button>
        </div>
      </form>
      {tour && <TourInfo tour={tour} />}
    </div>
  );
};

export default NewTour;
