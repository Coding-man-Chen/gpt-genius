"use server";
import OpenAi from "openai";
import prisma from "./db";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export type OpenaiMessageType =
  OpenAi.Chat.Completions.ChatCompletionMessageParam;

export type TourQueryProps = {
  city: string;
  country: string;
};

export type TourInfoProps = {
    city: string;
    country:string;
    title:string;
    description:string;
    stops:string[]
} 

export const generateMessage = async (chatMessages: OpenaiMessageType[]) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "you are a helpful assistant",
        },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo-0125",
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

export const getExistingTour = async ({ city, country }: TourQueryProps) => {
  return prisma.tour.findUnique({
    where:{
      city_country:{
        city,country
      }
    }
  })
};

export const generateTourResponse = async ({
  city,
  country,
}: TourQueryProps) => {
  const query = `Find a ${city} in this ${country}.
    If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
    Once you have a list, create a one-day tour. Response should be in the following JSON format: 
    {
      "tour": {
        "city": "${city}",
        "country": "${country}",
        "title": "title of the tour",
        "description": "description of the city and tour",
        "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
      }
    }
    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "you are a tour guide",
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      temperature: 0,
    });
    const tourData = JSON.parse(response.choices[0].message.content!)
    if(!tourData.tour){
        return null
    } 
    return tourData.tour as TourInfoProps
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createTour = async (tour:TourInfoProps) => {
  return prisma.tour.create({
    data:tour
  })
};

export const getAllTours = async (searchTerm?:string) => {
  if(!searchTerm){
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "asc"
      }
    })
    return tours
  }
  const tours = await prisma.tour.findMany({
    where:{
      OR:[
        {
          city:{
            contains: searchTerm
          },
          country:{
            contains:searchTerm
          }
        }
      ]
    }
  })
  return tours
}
