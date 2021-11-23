import React, { useState, useEffect } from "react";
import "./Game.css";
import lo from "lodash";
import { toast } from "react-toastify";

const INIT_STATE = {
  score: 0,
  time: 10,
  listWord: [
    "DUY",
    "DZAI",
    "HIHI",
    "ETET",
    "HEHE",
    "SASC",
    "SDSF",
    "ETAC",
    "HUHU",
    "HOHO",
  ],
  number: 0,
  word: "",
};

const MAX_QUESTION = 10;

const LIST_CHARACTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Game = () => {
  const [state, setState] = useState(INIT_STATE);
  const { score, listWord, number, word, time } = state;

  const handleChangeWord = (w) => {
      if(number === MAX_QUESTION){
          return;
      }
    let newWord = word + w;
    setState({
      ...state,
      word: newWord,
    });
  };

  useEffect(
    () => {
        if(number === MAX_QUESTION){
            return;
        }
      if (lo.size(word) > 0) {
        if (word === listWord[number]) {
          setState({
            ...state,
            score: score + 1,
            number: number + 1,
            word: "",
            time: 10
          });
          toast.success("Success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        } else if (lo.size(word) === lo.size(listWord[number])) {
            toast.error("Wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
              });
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [word]
  );

  useEffect(
    () => {
      if (time === 0) {
        setState({
          ...state,
          time: 10,
          number: number + 1,
          word: "",
        });
      } 
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [time]
  );

  useEffect(() => {
    let timeout = setInterval(() => {
      if (time === 0) {
        clearInterval(timeout);
      } else if (number === MAX_QUESTION) { 
        clearInterval(timeout);
      }
       else {
        setState({
          ...state,
          time: time - 1,
        });
      }
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  });

  const onChangeWord = (e) => {
    const keyword = e?.target?.value.toUpperCase();
    setState({
      ...state,
      word: keyword,
    });
  };

  return (
    <div className="game">
      <div className="container">
        <div className="row">
          <div className="col">Score: {score}</div>
          <div className="col">{number} / 10</div>
          <div className="col">Time: {time} </div>
        </div>
      </div>
      <div className="container">
        <div className="input-group input-group-sm mb-3"></div>
        <div className="word">{listWord[number]}</div>
        {/* <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          value={listWord[number]
        }
        /> */}
      </div>
      <div className="listbutton">
        {lo.map(LIST_CHARACTERS, (item, index) => (
          <button
            key={index}
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              handleChangeWord(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="container">
        <div className="input-group input-group-sm mb-3"></div>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          value={word}
          onChange={onChangeWord}
        />
      </div>
    </div>
  );
};

export default Game;
