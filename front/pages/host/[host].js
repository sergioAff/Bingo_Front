import * as React from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { createCartela, bingo } from "../../utils/bingo";

//styles
import styles from "../../styles/HostScreen.module.css";

import BingoDisplay from "../../components/BingoDisplay";
import ChatDisplay from "../../components/ChatDisplay";
import BingoWinner from "../../components/BingoWinner";

let socket;
let balls = {
  riffledOrder: [],
  riffleds: [],
};

export default function Host() {
  const router = useRouter();
  const { host, qtdBalls, gameOption } = router.query;
  const [path, setPath] = React.useState("wait");
  const [players, setPlayers] = React.useState([]);
  const [chat, setChat] = React.useState([]);
  const [sort, setSort] = React.useState([]);
  const [bingoWinner, setBingoWinner] = React.useState("");

  // Set event listeners
  React.useEffect(() => {
    socketInitializer();
  }, [host, qtdBalls]);

  const socketInitializer = async () => {
    try {
      await fetch("/api/socket?option=connection");
      socket = io();

      socket.on("connect", () => {
        console.log("Connected");
      });

      socket.on("get-chat", (msg) => {
        setChat((prev) => [...prev, msg]);
      });

      socket.on("get-new-player", (msg) => {
        setPlayers((old) => {
          let cartela = createCartela(
            Number(qtdBalls),
            old.filter((el) => el.cartela)
          );
          socket.emit("send-players", {
            room: host,
            msg: [...old.map((el) => el.name), msg.name],
          });
          socket.emit("send-cartela", { to: msg.id, cartela: cartela });
          socket.emit("send-chat", {
            room: host,
            name: "newPlayer",
            msg: `${msg.name} has joined.`,
          });
          return [...old, { name: msg.name, id: msg.id, cartela: cartela }];
        });
      });

      socket.on("get-bingo", (msg) => {
        setPath("bingo");
        setBingoWinner(msg);
      });
    } finally {
      socket.emit("join-room", host);
    }
  };

  const startGame = () => {
    setPath("play-room");
    balls.riffledOrder = bingo(Number(qtdBalls));
    socket.emit("send-start", host);
  };

  const riffle = () => {
    balls.riffleds.unshift(balls.riffledOrder.pop());
    setSort((old) => [balls.riffleds[0], ...old]);
    socket.emit("send-raffleds", host, balls.riffleds);
  };

  const handleChat = (name_, msg_) => {
    socket.emit("send-chat", { room: host, name: name_, msg: msg_ });
    setChat((prev) => [...prev, { name: "sent-200", msg: msg_ }]);
  };

  switch (path) {
    case "wait":
      return (
        <div className={`${styles.waitContainer}`}>
          <p
            className={`${styles.roomInfo} px-6 py-4 bg-gray-100 text-gray-800 font-medium text-lg rounded-lg shadow-md border border-gray-300`}
          >
            <span className="font-semibold">Room:</span> {host}
            <span className="font-semibold ml-4">Number of Balls:</span>{" "}
            {qtdBalls}
            <span className="font-semibold ml-4">Game Option:</span>{" "}
            {gameOption}
          </p>

          <div className={styles.playersList}>
            {players.map((e, idx) => (
              <div key={idx} className={styles.playerItem}>
                <p>{e.name}</p>
              </div>
            ))}
          </div>
          <button
            className="px-6 py-3 mx-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={startGame}
          >
            Start Game
          </button>

          <ChatDisplay name={"host"} content={chat} btnFunction={handleChat} />
        </div>
      );
    case "play-room":
      return (
        <div className={`${styles.playRoomContainer} min-h-[90dvh]`}>
          <ChatDisplay
            name={"host"}
            content={chat}
            btnFunction={handleChat}
            onGame={true}
          />
          <section className={`${styles.mainPlaySection} mt-4`}>
            <div className={`${styles.gridTwo} flex justify-between w-full`}>
              <p className="text-lg flex items-center justify-center font-semibold text-green-600 bg-green-100 p-2 rounded-lg shadow-md">
                Game Started
              </p>

              <button
                className={`${styles.riffleBtn} max-w-md`}
                onClick={riffle}
              >
                Draw
              </button>
              <BingoDisplay numbers={sort} type="main" />
            </div>
            <div
              className={`${styles.gridTwo} flex items-center justify-center border`}
            >
              <BingoDisplay
                numbers={sort}
                balls={Number(qtdBalls)}
                type="all"
              />
            </div>
          </section>
        </div>
      );
    case "bingo":
      return (
        <div className={styles.bingoContainer}>
          <ChatDisplay
            name={"host"}
            content={chat}
            btnFunction={handleChat}
            onGame={true}
          />
          <BingoWinner winner={bingoWinner} />
        </div>
      );
  }
}
