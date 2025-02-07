import { useState } from "react";
import { putInStorage } from "../src/Storage";
import {
  habitsArray,
  toggleCompletion,
  calcStreak,
  updateHabitBar,
} from "../src/Habits";

export function updateProgressBar() {
  let habitsDone = 0;
  habitsArray.forEach(function (h) {
    h.isCompleted && habitsDone++;
  });
  document.querySelector(".progress-done").style.width = `${
    (habitsDone * 100) / habitsArray.length
  }%`;
}

export function Habit(props) {
  const [done, setDone] = useState(props.habit.isCompleted);

  function checkHabit() {
    toggleCompletion(props.habit.id);
    setDone((prevDone) => {
      const newDone = !prevDone;

      if (newDone) {
        if (
          !habitsArray[props.habit.id - 1].completions.includes(
            new Date().toISOString().split("T")[0]
          )
        ) {
          habitsArray[props.habit.id - 1].completions.push(
            new Date().toISOString().split("T")[0]
          );
        }
      } else {
        const index = habitsArray[props.habit.id - 1].completions.indexOf(
          new Date().toISOString().split("T")[0]
        );
        if (index > -1) {
          habitsArray[props.habit.id - 1].completions.splice(index, 1);
        }
      }

      calcStreak(props.habit.id);
      updateProgressBar();
      updateHabitBar(props.habit.id);
      return newDone;
    });
  }
  putInStorage();

  return (
    <div className={`habit habit--${props.habit.id}`}>
      <p className="habit-title">{props.habit.title}</p>
      <p className="habit-created-on">{`Created on ${props.habit.createdOn}`}</p>
      <p className="habit-current-streak">Current Streak</p>
      <p className="habit-current-streak-data">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#333333"
          viewBox="0 0 256 256"
        >
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V208ZM152,88a31.91,31.91,0,0,0-24,10.86A32,32,0,0,0,72,120c0,36.52,50.28,62.08,52.42,63.16a8,8,0,0,0,7.16,0C133.72,182.08,184,156.52,184,120A32,32,0,0,0,152,88Zm-24,78.93c-13.79-7.79-40-26.75-40-46.93a16,16,0,0,1,32,0,8,8,0,0,0,16,0,16,16,0,0,1,32,0C168,140.19,141.79,159.15,128,166.93Z"></path>
        </svg>
        {props.habit.currentStreak}
      </p>
      <p className="habit-best-streak">Best Streak</p>
      <p className="habit-best-streak-data">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#333333"
          viewBox="0 0 256 256"
        >
          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V208ZM152,88a31.91,31.91,0,0,0-24,10.86A32,32,0,0,0,72,120c0,36.52,50.28,62.08,52.42,63.16a8,8,0,0,0,7.16,0C133.72,182.08,184,156.52,184,120A32,32,0,0,0,152,88Zm-24,78.93c-13.79-7.79-40-26.75-40-46.93a16,16,0,0,1,32,0,8,8,0,0,0,16,0,16,16,0,0,1,32,0C168,140.19,141.79,159.15,128,166.93Z"></path>
        </svg>
        {props.habit.bestStreak}
      </p>
      <div className="habit-bar">
        <div className="habit-progress-bar">
          <div className="habit-progress-done"></div>
        </div>
      </div>
      <button
        onClick={checkHabit}
        className={`cursor-hover habit-checkbox ${
          done ? "complete" : "incomplete"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#f8f7f3"
          viewBox="0 0 256 256"
        >
          <path
            d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
            opacity="0.2"
          ></path>
          <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
      </button>
    </div>
  );
}
