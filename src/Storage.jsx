import { habitsArray } from "./Habits";

export function putInStorage() {
  try {
    localStorage.setItem("MainHabitArray", JSON.stringify(habitsArray));
  } catch (error) {
    console.log("Local Storage Error");
  }
}
