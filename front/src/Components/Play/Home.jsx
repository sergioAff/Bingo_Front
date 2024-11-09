"use client";

import * as React from "react";
import JoinForm from "./JoinForm";
import { pressStart2P } from "@/app/fonts/fonts";

export default function Home(props) {
  const handleJoinRoom = (room_, name_, option) => {
    switch (option) {
      case "join":
        window.location.href = `${room_}?name=${name_}`;
        break;
      case "create":
        props.path("create-room");
        break;
    }
  };

  return (
    <div
      className={`min-h-[100dvh] flex flex-col justify-center gap-4 items-center px-4 py-2 text-gray-100 ${pressStart2P.className}`}
    >
      <JoinForm type="home" btnFunction={handleJoinRoom} />
    </div>
  );
}
