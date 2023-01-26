import React from "react";

const Square = ({ chooseSquare, val }) => {
  return (
    <div
      onClick={chooseSquare}
      className="p-3 border border-solid border-white h-10 w-14 m-0 hover:bg-orange-300 cursor-pointer"
    >
      {val}
    </div>
  );
};

export default Square;
