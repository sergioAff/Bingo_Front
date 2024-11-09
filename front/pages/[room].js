import { useRouter } from "next/router";
import * as React from "react";
import io from "socket.io-client";

// styles
import styles from "../styles/PlayerScreen.module.css";

// components
import ChatDisplay from "../components/ChatDisplay";
import JoinForm from "../components/JoinForm";
import BingoDisplay from "../components/BingoDisplay";
import PlayerDisplay from "../components/PlayerDisplay";
import BingoWinner from "../components/BingoWinner";

let socket;
export default function Room() {
  const router = useRouter();
  const { room, name } = router.query;
  const [name2, setName2] = React.useState(name);
  const [path, setPath] = React.useState(" ");
  const [chat, setChat] = React.useState([]);
  const [cartela, setCartela] = React.useState([]);
  const [raffleds, setRaffleds] = React.useState([]);
  const [bingoWinner, setBingoWinner] = React.useState("");
  const [gameStatus, setGameStatus] = React.useState("playing"); // Estado para manejar pérdida

  React.useEffect(() => {
    socketInitializer(name);
  }, [name]);

  // Set event listeners
  const socketInitializer = async (name_) => {
    try {
      console.log("Initializing socket");
      await fetch("/api/socket?option=connection");
      socket = io();
      socket.on("connect", () => {
        if (name_ != undefined) joinRoom(room, name);
      });

      socket.on("get-players", (msg) => {
        // Handle player list
      });

      socket.on("get-chat", (msg) => {
        setChat((prev) => [...prev, msg]);
      });

      socket.on("get-cartela", (msg) => {
        // Receive player raffled numbers
        setCartela(msg);
      });

      socket.on("get-raffleds", (msg) => {
        // Receive raffled balls
        setRaffleds(msg);
      });

      socket.on("start-game", () => {
        // Start game
        setPath("play-room");
      });

      socket.on("get-bingo", (msg) => {
        // Handle bingo event
        setPath("bingo");
        setBingoWinner(msg);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const joinRoom = (room_, name_) => {
    socket.emit("join-room", room_);
    socket.emit("send-to-host", { room: room_, name: name_, id: socket.id });
    setName2(name_);
    setPath("wait");
  };

  const handleChat = (name_, msg_) => {
    socket.emit("send-chat", { room: room, name: name_, msg: msg_ });
    setChat((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  const bingo = () => {
    let count = 0;
    cartela.forEach((el) => {
      if (raffleds.includes(el)) count++;
    });

    if (cartela.length === count) {
      // Bingo correcto
      setPath("bingo");
      setBingoWinner(name2);
      socket.emit("send-bingo", room, name2);
    } else {
      // No cumple con los requisitos de Bingo
      alert(
        "You did not meet the requirements for Bingo and have lost the game."
      );
      setGameStatus("lost"); // Marcar el juego como perdido
      setPath("lost-game"); // Cambiar la ruta a "lost-game"
    }
  };

  const displayChat = (option) => {
    console.log(option);
    return (
      <ChatDisplay
        name={name2}
        content={chat}
        btnFunction={handleChat}
        cartela={cartela}
        onGame={option === "on-game"}
      />
    );
  };

  switch (path) {
    case "wait":
      return displayChat();

    case "play-room":
      return (
        <>
          {displayChat("on-game")}
          <section className={styles.main_play}>
            <p>{name2}</p>
            <p>Last 5 drawn numbers</p>
            <BingoDisplay
              type="player"
              max={5}
              numbers={raffleds}
              title={"Last Draws"}
            />
            <PlayerDisplay numbers={cartela.sort()} />
            <button className={styles.btn_bingo} onClick={bingo}>
              Bingo!
            </button>
          </section>
        </>
      );

    case "bingo":
      return (
        <>
          {displayChat("on-game")}
          <BingoWinner winner={bingoWinner} />
        </>
      );

    case "lost-game":
      return (
        <>
          {displayChat()}
          <section className={styles.main}>
            <p className="text-red-600 font-bold text-lg">
              Sorry, {name2}, you didn’t achieve Bingo and have lost the game.
            </p>
            <button
              className={styles.btn_back}
              onClick={() => router.push("/")}
            >
              Return to Home
            </button>
          </section>
        </>
      );

    default:
      return (
        <>
          <section className={styles.main}>
            <p>
              Welcome {name} to room {room}
            </p>
            {name === undefined && (
              <JoinForm type="room" btnFunction={joinRoom} room={room} />
            )}
          </section>
        </>
      );
  }
}
