import * as React from "react";

export default function JoinForm(props) {
  const [name2, setName2] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [qtdBalls, setQtdBalls] = React.useState(99);
  const [gameOption, setGameOption] = React.useState("default");

  switch (props.type) {
    case "room":
      return (
        <>
          <input
            autoComplete="off"
            className={"text-black p-2 rounded-md"}
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            name="room"
            type="text"
          ></input>
          <button
            className={``}
            onClick={() => props.btnFunction(props.room, name2)}
          >
            Enter
          </button>
        </>
      );
    case "home":
      return (
        <>
          <label className={""}>Room ID</label>
          <input
            autoComplete="off"
            className={"rounded text-black p-2"}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            name="room"
            type="text"
          ></input>
          <label className={""}>Your Name</label>
          <input
            autoComplete="off"
            className={"rounded text-black p-2"}
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            name="room"
            type="text"
          ></input>
          <button
            className={`rounded bg-blue-500 text-white p-2`}
            onClick={() => props.btnFunction(room, name2, "join")}
          >
            Join
          </button>
          <button
            className={`rounded bg-gray-500 text-white p-2`}
            onClick={() => props.btnFunction(room, name2, "create")}
          >
            Create Room
          </button>
        </>
      );
    case "host":
      return (
        <>
          <label className={""}>Room ID</label>
          <input
            autoComplete="off"
            className={""}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            name="room"
            type="text"
          ></input>
          {props.roomAvailability && <p> Room occupied </p>}
          <label className={""}>Number of Balls</label>
          <input
            className={""}
            value={qtdBalls}
            onChange={(e) => setQtdBalls(e.target.value)}
            name="qtdBalls"
            min={50}
            max={99}
            type="number"
          ></input>
          <label>Choose option: </label>
          <select
            name="cars"
            id="cars"
            onChange={(e) => setGameOption(e.target.value)}
          >
            <option value="default">default</option>
            <option value="new">new</option>
          </select>
          <button
            className={``}
            onClick={() => props.btnFunction(room, qtdBalls, gameOption)}
          >
            Create
          </button>
        </>
      );
  }
}
