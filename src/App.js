import React from "react";
import "./App.css";
import Game from "./Game";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Game />
      <ToastContainer />
    </div>
  );
}
export default App;
