import { useEffect } from "react";
import { putInStorage } from "./Storage";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { Habit, updateProgressBar } from "../components/Habit";
import { habitsArray, updateHabitBar, calcStreak } from "./Habits";
import "./App.css";

//IMPLEMENT LOCAL STORAGE✅, HABIT PROGRESS BAR✅ , CURRENT STREAK✅, BEST STREAK✅, CREATE HABIT BTN✅, DELETE HABIT BTN✅

//map() function used to convert habitsArray into JSX elements
const HabitsJSX = habitsArray.map((habit) => {
  return <Habit key={habit.id} habit={habit} />;
});

function App() {
  //The updateHabitBar() changes the style width of the Habit Bar hence all HTML elements need to be fully loaded.
  // For calcStreak() no such loading is required
  habitsArray.forEach((h) => calcStreak(h.id));
  window.onload = function () {
    let checkExist = setInterval(() => {
      let allExist = habitsArray.every((h) =>
        document.querySelector(`.habit--${h.id} .habit-progress-done`)
      );
      //allExist is only true when all habit elements are loaded
      if (allExist) {
        updateProgressBar();
        habitsArray.forEach((h) => updateHabitBar(h.id));
        clearInterval(checkExist); // Stop checking once elements exist
      }
    }, 100);
  };

  useEffect(() => putInStorage);
  return (
    <>
      <Header />
      <Menu />

      <section className="section-habit-display">{HabitsJSX}</section>
    </>
  );
}

export default App;
