import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
// import { v4 as uuidv4 } from "uuid";

const SignUp = ({ setIsAuth }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [user, setUser] = useState(null);
  const singUp = () => {
    fetch("https://tictoctoserver.vercel.app/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const { yourName, email, userName, userId, hashedPassword, token } =
          data;
        cookies.set("yourName", yourName);
        cookies.set("email", email);
        cookies.set("userName", userName);
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
    /* Axios.post("https://tictoctoserver.vercel.app/signup", user)
      .then((res) => {
        const { yourName, email, userName, userId, hashedPassword, token } =
          res.data;
        cookies.set("yourName", yourName);
        cookies.set("email", email);
        cookies.set("userName", userName);
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("hashedPassword", hashedPassword);
        setIsAuth(true);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      }); */
    // console.log(user);
  };
  return (
    <div className="flex flex-col items-center my-5">
      <label htmlFor="" className="text-2xl font-bold text-left mb-5 w-64">
        Let's get to know you better!
      </label>
      {errorMessage && errorMessage.length > 1 ? (
        <div className="uppercase text-red-600 my-3">{errorMessage}</div>
      ) : (
        <></>
      )}

      <input
        className="bg-gray-200 px-2 py-1 rounded my-2 "
        type="text"
        name="yourName"
        placeholder="Your Name"
        onChange={(event) => {
          setUser({ ...user, yourName: event.target.value });
        }}
      />
      <input
        className="bg-gray-200 px-2 py-1 rounded my-2 "
        type="email"
        name="email"
        placeholder="jane@gmail.com"
        onChange={(event) => {
          setUser({ ...user, email: event.target.value });
        }}
      />
      <input
        className="bg-gray-200 px-2 py-1 rounded my-2 "
        type="text"
        name="userName"
        placeholder="User Name"
        onChange={(event) => {
          setUser({ ...user, userName: event.target.value });
        }}
      />
      <input
        className="bg-gray-200 px-2 py-1 rounded my-2 "
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button
        className="h-14 mt-3 w-80 rounded-lg bg-[#F2C94C] text-white font-semibold mx-auto"
        type="submit"
        onClick={singUp}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
