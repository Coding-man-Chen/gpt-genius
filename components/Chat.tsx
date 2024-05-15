"use client";
import { FormEvent, useState } from "react";

const Chat = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(text)
  }
  return <div className="flex flex-col min-h-[calc(100vh-6rem)]">
    <div className="flex-1">
        <h2 className="text-5xl">Messages</h2>
    </div>
    <form className="join max-w-4xl pt-12 w-full" onSubmit={handleSubmit}>
        <input type="text" className="join-item input-bordered w-full" placeholder=" Message GeniusGPT" required value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn btn-primary join-item uppercase">ask question</button>
    </form>
  </div>;
};

export default Chat;
