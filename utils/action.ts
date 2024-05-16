"use server";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export type OpenaiMessageType =
  OpenAi.Chat.Completions.ChatCompletionMessageParam;

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
