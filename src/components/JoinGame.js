import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

const JoinGame = () => {
  const [channel, setChannel] = useState(null);
  const [rivalEmail, setRivalEmail] = useState("");
  // console.log(rivalUserName);
  const { client } = useChatContext();
  async function createChannel() {
    const response = await client.queryUsers({
      email: { $eq: rivalEmail },
    });
    if (response.users.length === 0) {
      alert("user not found");
      return;
    }
    // console.log(client.user.id);
    // console.log(response.users[0].id);
    const newChannel = client.channel("messaging", {
      members: [client.user.id, response.users[0].id],
    });
    // console.log(newChannel);
    await newChannel.watch();
    setChannel(newChannel);
  }
  return channel ? (
    <Channel channel={channel} rival={rivalEmail}>
      <Game channel={channel} setChannel={setChannel} rival={rivalEmail}></Game>
    </Channel>
  ) : (
    <>
      <div>
        <h2 className="text-2xl font-bold my-3">create a new game</h2>
        <input
          className="outline px-2 py-1 rounded my-2 "
          type="email"
          name="email"
          placeholder="insert user email to play"
          onChange={(event) => {
            setRivalEmail(event.target.value);
          }}
        />
        <button
          onClick={createChannel}
          className="h-10 mt-3 w-52 ml-2 rounded-lg bg-[#F2C94C] text-white font-semibold mx-auto"
        >
          Start Game
        </button>
      </div>
    </>
  );
};

export default JoinGame;
