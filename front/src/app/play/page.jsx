"use client";
import { useState } from "react";
import Head from "next/head";

//components
import PlayerScreen from "../../Components/Play/PlayerScreen";
import HostScreen from "../../Components/Play/HostScreen";
import dynamic from "next/dynamic";

//text content
import content from "../../utils/content";

// Importamos el componente Home de manera dinámica con ssr: false
const Home = dynamic(() => import("../../Components/Play/Home"), {
  ssr: false,
});

export default function Index() {
  const [path, setPath] = useState("home");
  const handlePath = (path) => {
    setPath(path);
  };

  switch (path) {
    case "create-room":
      return (
        <>
          <Head>
            <title>Bingo! - Create Room</title>
          </Head>
          <HostScreen content={content.en.createRoom} path={handlePath} />
        </>
      );
    case "join-room":
      return (
        <>
          <Head>
            <title>Bingo! - Join Room</title>
          </Head>
          <PlayerScreen content={content.en.joinRoom} path={handlePath} />
        </>
      );
    default:
      return (
        <>
          <Head>
            <title>Bingo! - Home</title>
          </Head>
          {/* Cargar Home dinámicamente */}
          <Home content={content.en.home} path={handlePath} />
        </>
      );
  }
}
