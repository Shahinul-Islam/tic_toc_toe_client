import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "../patterns/WinningPatterns";

const Board = ({ result, setResult }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]); //this state represents the boards 9 elements and initially their value will be empty

  const [player, setPlayer] = useState("X");
  // console.log("playing with ", player);
  // let player
  const [turn, setTurn] = useState("X");
  const { channel } = useChannelStateContext();
  // owner
  // member
  // console.log(channel.state.membership.role);
  /*  if (
    channel.state.membership.role === "owner"
      ? `${setPlayer("X")}`
      : `${setPlayer("O")}`
  ); */
  const { client } = useChatContext();
  // console.log(client);
  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);
  const chooseSquare = async (square) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });
      setBoard(
        board.map((val, idx) => {
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };
  channel.on((event) => {
    // if(event.type=="game-mode")

    // console.log(event);
    if (event.type === "game-move" && event.user.id !== client.user.id) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((value, idx) => {
          if (idx === event.data.square && value === "") {
            return event.data.player;
          }
          return value;
        })
      );
    }
  });
  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      //it will loop through all the patterns and check if the winning pattern exist on the board or not
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currentPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        // alert("Winner: ", board[currentPattern[0]]);
        setResult({ winner: board[currentPattern[0]], state: "Won" });
      }
    });
  };
  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });
    if (filled) {
      // alert("It's Draw ");
      setResult({ winner: "none", state: "Draw" });
    }
  };
  return (
    <div>
      {player && player.length > 0 ? (
        <p>You are playing with: {player}</p>
      ) : (
        <></>
      )}
      <div className="board flex bg-orange-600 p-9 text-white font-bold justify-center items-center">
        <div className="row inline w-14">
          <Square
            chooseSquare={() => {
              chooseSquare(0);
            }}
            val={board[0]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(1);
            }}
            val={board[1]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(2);
            }}
            val={board[2]}
          ></Square>
        </div>
        <div className="row inline w-14">
          <Square
            chooseSquare={() => {
              chooseSquare(3);
            }}
            val={board[3]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(4);
            }}
            val={board[4]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(5);
            }}
            val={board[5]}
          ></Square>
        </div>
        <div className="row inline w-14">
          <Square
            chooseSquare={() => {
              chooseSquare(6);
            }}
            val={board[6]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(7);
            }}
            val={board[7]}
          ></Square>
          <Square
            chooseSquare={() => {
              chooseSquare(8);
            }}
            val={board[8]}
          ></Square>
        </div>
      </div>
    </div>
  );
};

export default Board;
