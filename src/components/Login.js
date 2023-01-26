import Axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const Login = ({ setIsAuth }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const login = () => {
    /* Axios.post("https://tictoctoserver.vercel.app/login", {
      userName,
      password,
    }).then((res) => {
      const { yourName, email, userName, userId, hashedPassword, token } =
        res.data;
      cookies.set("yourName", yourName);
      cookies.set("email", email);
      cookies.set("userName", userName);
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    }); */
    fetch("https://tictoctoserver.vercel.app/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
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
      });
  };

  return (
    <div className="flex flex-col items-center my-5">
      <label htmlFor="" className="text-2xl font-bold text-left mb-5 w-64">
        Login
      </label>

      <input
        className="bg-gray-300 px-2 py-1 rounded my-2 "
        type="text"
        name="userName"
        placeholder="User Name"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <input
        className="bg-gray-300 px-2 py-1 rounded my-2 "
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        className="h-14 mt-3 w-80 rounded-lg bg-[#F2C94C] text-white font-semibold mx-auto"
        type="submit"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
