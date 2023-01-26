import React, { useState } from "react";
import Board from "./Board";
// import { Window, MessageList, MessageInput } from "stream-chat-react";

const Game = ({ channel, setChannel, rival }) => {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  console.log(playersJoined, rival);
  const [result, setResult] = useState({ winner: "none", state: "none" });
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <h2>waiting for other player to join</h2>;
  } else {
    return (
      <div>
        <div className="gameContainer flex flex-col justify-center items-center  gap-2 w-10/12 h-screen">
          {/* <h2>Board component</h2> */}
          <Board result={result} setResult={setResult}></Board>
          {/* <h2>chat component between two players</h2> */}
          {/* <Window>
            <MessageList
              disableDateSeparator
              closeReactionSelectorOnClick
              hideDeletedMessages
              messageActions={["react"]}
            ></MessageList>
            <MessageInput noFiles={true}></MessageInput>
          </Window> */}
          {/* <button>Leave the Game</button> */}
          <button
            className="bg-orange-500 px-3 py-1 rounded ml-2"
            onClick={async () => {
              await channel.stopWatching();
              setChannel(null);
            }}
          >
            Leave Game
          </button>
          {result.state === "Won" && <div>{result.winner} Won the game</div>}
          {result.state === "Draw" && <div>Game Tied</div>}
        </div>
      </div>
    );
  }
};

export default Game;
