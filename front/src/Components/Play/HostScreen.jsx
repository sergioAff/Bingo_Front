import * as React from "react";
import io from "socket.io-client";
import { createCartela, bingo } from "../../utils/bingo";
import { pressStart2P } from "@/app/fonts/fonts";

//componets
import BingoDisplay from "@/app/components/BingoDisplay";
import Image from "next/image";

let socket;
let room1;
let amount;
let balls = {
  riffledOrder: [],
  riffleds: [],
};

export default function HostScreen(props) {
  //HOOKERS
  const [room, setRoom] = React.useState("");
  const [qtdBalls, setQtdBalls] = React.useState(99);
  const [path, setPath] = React.useState("create-room");
  const [players, setPlayers] = React.useState([]);
  const [sort, setSort] = React.useState([]);
  const [bingoWinner, setBingoWinner] = React.useState("");
  const [thereIsRoom, setThereIsRoom] = React.useState(false);

  //set event listeners
  React.useEffect(() => {
    socketInitializer();
  }, []);
  const socketInitializer = async () => {
    await fetch("/api/socket?option=connection");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("get-new-player", (msg) => {
      setPlayers((old) => {
        let cartela = createCartela(
          amount,
          old.filter((el) => el.cartela)
        );
        socket.emit("send-players", {
          room: room1,
          msg: [...old.map((el) => el.name), msg.name],
        });
        socket.emit("send-cartela", { to: msg.id, cartela: cartela });
        console.log("here");
        socket.emit("send-chat", {
          room: room1,
          name: "host",
          msg: `${msg.name} entrou.`,
        });
        return [...old, { name: msg.name, id: msg.id, cartela: cartela }];
      });
      socket.emit("send-cartela", { to: msg.id });
    });

    socket.on("get-bingo", (msg) => {
      setPath("bingo");
      setBingoWinner(msg);
    });
  };

  //METHODS

  const createRoom = async () => {
    const res = await fetch(`/api/socket?option=room&room=${room}`);
    const posts = await res.json();
    if (!posts.thereIs) {
      socket.emit("join-room", room);
      room1 = room;
      amount = qtdBalls;
      setPath("wait-room");
    } else {
      setThereIsRoom(true);
    }
  };

  const startGame = () => {
    setPath("play-room");
    balls.riffledOrder = bingo(amount);
    socket.emit("send-start", room);
  };

  const riffle = () => {
    balls.riffleds.unshift(balls.riffledOrder.pop());
    setSort((old) => [balls.riffleds[0], ...old]);
    socket.emit("send-raffleds", room, balls.riffleds);
  };

  switch (path) {
    case "create-room":
      return (
        <div
          className={`min-h-[100vh] flex flex-col gap-4 items-center justify-center ${pressStart2P.className} text-gray-100`}
        >
          <h1 className={""}> {props.content.createRoom.title}</h1>
          <label className={""}> {props.content.createRoom.label1} </label>
          {thereIsRoom && <p>{props.content.createRoom.warning}</p>}
          <input
            autoComplete="off"
            className={"p-2 text-black rounded-md"}
            value={room}
            minLength="1"
            maxLength="5"
            onChange={(e) => setRoom(e.target.value)}
            name="room"
            type="text"
          ></input>
          <label className={""}> {props.content.createRoom.label2} </label>
          <input
            className={"p-2 text-black rounded-md"}
            value={qtdBalls}
            onChange={(e) => setQtdBalls(e.target.value)}
            name="qtdBalls"
            min={75}
            max={75}
            type="number"
          ></input>
          <button className={"p-2 bg-blue-500 rounded-md"} onClick={createRoom}>
            {props.content.createRoom.btn}{" "}
          </button>
        </div>
      );

    case "wait-room":
      return (
        <section className={""}>
          <div className={""}>
            <h1 className={""}> {props.content.waitRoom.title} </h1>
            <h1 className={""}>{room}</h1>
            <p>
              {props.content.waitRoom.subtitle} {qtdBalls}
            </p>
            <button className={""} onClick={startGame}>
              {props.content.waitRoom.btn}
            </button>
          </div>
          <div className={""}>
            <p>{props.content.waitRoom.title2}</p>
            {players.map((el, i) => {
              return (
                <p key={i}>
                  {el.name} {props.content.waitRoom.subtitle2}
                </p>
              );
            })}
          </div>
          <div className={""}>
            <h3>{props.content.waitRoom.title3}</h3>
            {props.content.waitRoom.instructions}
          </div>
        </section>
      );

    case "play-room":
      return (
        <section className={""}>
          <div className={""}>
            <p> {props.content.playRoom.title} </p>
            <button onClick={riffle}> {props.content.playRoom.btn} </button>
            <BingoDisplay numbers={sort} type="main" />
          </div>
          <div className={""}>
            <BingoDisplay numbers={sort} balls={qtdBalls} type="all" />
          </div>
        </section>
      );
    case "bingo":
      return (
        <section className={bingo}>
          <Image src="/Play/Logo2.svg" width={100} height={100} alt="Logo" />
          <p className={""}>
            {" "}
            {bingoWinner} {props.content.bingo.title}
          </p>
        </section>
      );
    default:
      return (
        <>
          <p>default</p>
        </>
      );
  }
}
