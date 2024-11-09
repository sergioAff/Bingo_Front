const en_instructions = (
  <>
    <p>
      When the players join the room, they all receive a sequence of random
      numbers, those numbers are unique between the players in that round.
    </p>
    <p>
      The raffled balls will be shown on the host screen. On the players screen
      will be exhibited the last 5 raffled balls.
    </p>
    <p>
      When you click on a number on the screen player, that number will receive
      an emphasis regardless of the raffled balls.
    </p>
    <p>
      When you click on the bingo! button, your numbers will be verified. If a
      bingo does not occur, you will receive a strike, with three strikes you
      will be eliminated from that round. If the bingo happens, the round will
      finish and your name will be displayed on all players' screens.
    </p>
  </>
);

const en = {
  home: {
    btn1: "Join room",
    btn2: "Create room",
  },
  createRoom: {
    createRoom: {
      title: "Create Room",
      label1: "ROOM NAME: ",
      label2: "BALLS AMOUNT (50 - 99): ",
      btn: "Join",
      warning: "Room unavailable, try another name.",
    },
    waitRoom: {
      title: "ROOM ID: ",
      subtitle: "Balls amount: ",
      btn: "Start",
      title2: "Waiting players... ",
      subtitle2: "is here.",
      title3: "Instructions",
      instructions: en_instructions,
    },
    playRoom: {
      title: "Raffling off balls...",
      btn: "Raffle",
    },
    bingo: {
      title: "Won!",
    },
  },
  joinRoom: {
    joinRoom: {
      title: "Join Room",
      label1: "YOUR NAME: ",
      label2: "ROOM ID: ",
      btn: "Join",
    },
    waitRoom: {
      title: "Waiting to start...",
      subtitle: "Your numbers:  ",
      subtitle2: "Creating paper",
      subtitle3: "is here!",
      title2: "Instructions",
      title3: "Waiting players...",
      instructions: en_instructions,
    },
    playRoom: {
      title: "The game is on",
      btn: "BINGO!",
      bingoDisplay: {
        title: "last 5 numbers:",
      },
    },
    bingo: {
      title: "won!",
    },
  },
};

export default { en };
