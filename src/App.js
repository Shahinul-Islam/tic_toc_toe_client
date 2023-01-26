import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Routes";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const api_key = "f4y2g635p78c";
  const client = StreamChat.getInstance(api_key);
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("userName"),
          email: cookies.get("email"),
          fullName: cookies.get("yourName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  const logOut = () => {
    cookies.remove("yourName");
    cookies.remove("email");
    cookies.remove("userName");
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("hashedPassword");
    setIsAuth(false);
  };
  return (
    <div className="App w-11/12">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame></JoinGame>
          <button
            className="btn mx-auto bg-orange-400 text-center px-3 py-1 w-28 rounded-sm mt-2 font-semibold shadow"
            onClick={logOut}
          >
            Logout
          </button>
        </Chat>
      ) : (
        <>
          <div className="mt-16 flex flex-col items-center justify-center mx-auto text-center">
            <p>async</p>
            <h2 className="text-4xl mt-5 font-bold">Tic Tac Toe</h2>
            {/* <button className="h-14 mt-16 w-80 rounded-lg bg-[#2F80ED] text-white font-semibold mx-auto">
              Login
            </button> */}
            {/* <button className="h-14 mt-3 w-80 rounded-lg bg-[#F2C94C] text-white font-semibold mx-auto">
              Register
            </button> */}
          </div>
          <SignUp setIsAuth={setIsAuth}></SignUp>
          <Login setIsAuth={setIsAuth}></Login>
        </>
      )}
    </div>
  );
}

export default App;
