"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

// styles
import styles from "../styles/PlayerScreen.module.css";

// components
import PlayerDisplay from "../Components/PlayerDisplay";
import BingoDisplay from "../Components/BingoDisplay";
import Image from "next/image";

let socket;

export default function PlayerScreen(props) {
  // Estados
  const [players, setPlayers] = useState([]);
  const [bingoWinner, setBingoWinner] = useState("");
  const [path, setPath] = useState("join-room");
  const [cartela, setCartela] = useState([]);
  const [raffleds, setRaffleds] = useState([]);
  const [data, setData] = useState({
    name: "",
    room: "",
  });

  useEffect(() => {
    const fetchSocket = async () => {
      await fetch("/api/socket"); // Inicializa el servidor WebSocket

      // Conecta con el cliente de Socket.IO solo si no hay conexión previa
      if (!socket) {
        socket = io();

        socket.on("connect", () => {
          console.log("Cliente conectado a Socket.IO");
        });

        socket.on("get-players", (msg) => {
          setPlayers(msg);
        });

        socket.on("get-cartela", (msg) => {
          setCartela(msg);
        });

        socket.on("get-raffleds", (msg) => {
          setRaffleds(msg);
        });

        socket.on("start-game", () => {
          setPath("play-room");
        });

        socket.on("get-bingo", (msg) => {
          setPath("bingo");
          setBingoWinner(msg);
        });
      }
    };

    fetchSocket();

    // Cleanup al desmontar el componente
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  // Métodos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const joinRoom = (name, room) => {
    socket.emit("join-room", room);
    socket.emit("send-to-room", { room: room, name: name, id: socket.id });
    setPath("wait-room");
  };

  const bingo = () => {
    let count = 0;
    cartela.forEach((el) => {
      if (raffleds.find((ele) => ele === el) !== undefined) count++;
    });

    if (cartela.length === count) {
      socket.emit("send-bingo", data.room, data.name);
      setPath("bingo");
      setBingoWinner(data.name);
    } else {
      console.log("NO FUE BINGO");
    }
  };

  // Renderización condicional según la ruta (path)
  switch (path) {
    case "join-room":
      return (
        <section className={styles.main}>
          <h1 className={styles.title}>{props.content.joinRoom.title}</h1>
          <label className={styles.label}>
            {props.content.joinRoom.label1}
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            value={data.name}
            onChange={handleChange}
            name="name"
            type="text"
          ></input>

          <label className={styles.label}>
            {props.content.joinRoom.label2}
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            value={data.room}
            onChange={handleChange}
            name="room"
            type="text"
          ></input>

          <button
            className={styles.btn_enter}
            onClick={() => joinRoom(data.name, data.room)}
          >
            {props.content.joinRoom.btn}
          </button>
        </section>
      );
    case "wait-room":
      return (
        <section className={styles.main_wait}>
          <div className={styles.div_grid_3}>
            <h1>{props.content.waitRoom.title}</h1>
            <p>{props.content.waitRoom.subtitle}</p>
            <p>
              {cartela ? cartela.join(" ") : props.content.waitRoom.subtitle2}
            </p>
          </div>
          <div className={styles.div_grid_3}>
            <p>{props.content.waitRoom.title2}</p>
            {props.content.waitRoom.instructions}
          </div>
          <div className={styles.div_grid_3}>
            <p>{props.content.waitRoom.title3}</p>
            {players.map((el, i) => {
              return (
                <p key={i}>
                  {el} {props.content.waitRoom.subtitle3}
                </p>
              );
            })}
          </div>
        </section>
      );
    case "play-room":
      return (
        <section className={styles.main_play}>
          <p>{data.name}</p>
          <p>{props.content.playRoom.title}</p>
          <BingoDisplay
            type="player"
            max={5}
            numbers={raffleds}
            title={props.content.playRoom.bingoDisplay.title}
          />
          <PlayerDisplay numbers={cartela.sort()} />
          <button className={styles.btn_bingo} onClick={bingo}>
            {props.content.playRoom.btn}
          </button>
        </section>
      );
    case "bingo":
      return (
        <section className={styles.bingo}>
          <Image src="/Logo2.svg" alt="Logo" width={150} height={150} />
          <p className={styles.bingo_winner}>
            {bingoWinner} {props.content.bingo.title}
          </p>
        </section>
      );
    default:
      return <p>Error 404</p>;
  }
}
