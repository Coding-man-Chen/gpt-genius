"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchUserTokensById, generateMessage, substractTokens } from "@/utils/action";
import { type OpenaiMessageType } from "@/utils/action";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
const Chat = () => {
  const [text, setText] = useState("");
  const {userId} = useAuth()
  const [messages, setMessages] = useState<OpenaiMessageType[]>([]);
  const { mutate,isPending } = useMutation({
    mutationFn: async (query: OpenaiMessageType) => {
      const currentTokens = await fetchUserTokensById(userId!)
      if( !currentTokens || currentTokens<100){
        toast.error("Tokens balance too low...");
        return null
      }
      const response = await generateMessage([...messages, query])
      if(!response){
        toast.error("Something went wrong");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      setText("");
      const newTokens = await substractTokens(userId!,response.tokens!)
      toast.success(`${newTokens} tokens remaining...`)   
    },
    // mutationFn: (query: OpenaiMessageType) =>
    //   generateMessage([...messages, query]),
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: OpenaiMessageType = {
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, query]);
    mutate(query);
  };
  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
      <div className="flex-1">
        <div>
          {messages.map((message, index) => {
            const avatar = message.role === "user" ? "🙍🏻‍♂️" : "🤖";
            const bcg = message.role === "user" ? "bg-base-200" : "bg-base-100";
            return <div key={index} className={`${bcg} flex py-6 px-8 text-xl leading-loose border-b border-base-300 -mx-8`}>
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{message.content as string}</p>
            </div>
          })}
          {
            isPending && <span className="loading"></span>
          }
        </div>
      </div>
      <form className="join max-w-4xl pt-12 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          className="join-item input-bordered w-full px-4"
          placeholder=" Message GeniusGPT"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary join-item uppercase" disabled={isPending}>
          {
            isPending ? 'please wait' : 'ask question'
          }
        </button>
      </form>
    </div>
  );
};

export default Chat;
