import { habitsArray } from "../src/Habits";
import { putInStorage } from "../src/Storage";
import { updateProgressBar } from "./Habit";

export function Menu() {
  function show(e) {
    if (e.target.classList.contains("create-habit")) {
      document.querySelector(".section-create").classList.toggle("hidden");
    } else if (e.target.classList.contains("delete-habit")) {
      document.querySelector(".section-delete").classList.toggle("hidden");
    }
  }

  function createNewHabit() {
    const newHabitName = document.querySelector(".input-create").value;
    habitsArray.push({
      id: habitsArray.length + 1,
      isCompleted: false,
      title: `${newHabitName}`,
      createdOn: new Date().toISOString().split("T")[0],
      currentStreak: 0,
      bestStreak: 0,
      completions: [],
    });
    document.querySelector(".input-create").value = "";
    console.log(habitsArray);
    putInStorage();
    window.location.reload();
    updateProgressBar();
  }

  function deleteHabit() {
    const habitToDeleteTitle = document.querySelector(".input-delete").value;
    habitsArray.forEach(function (h, i) {
      if (h.title === habitToDeleteTitle) {
        habitsArray.splice(i, 1);
      }
    });
    //Now we have to reset the id for each habit as deleting may have messed them up!!!
    habitsArray.forEach(function (h, i) {
      h.id = i + 1;
    });
    console.log(habitsArray);
    putInStorage();
    window.location.reload();
    updateProgressBar();
  }

  return (
    <section className="section-menu">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#333333"
        viewBox="0 0 256 256"
        className="menu-icon"
      >
        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
      </svg>
      <div onClick={(e) => show(e)} className="menu-tab">
        <button className="create-habit cursor-hover">Create habit</button>
        <section className="section-create hidden">
          <div className="create-box">
            <input
              className="input-create"
              type="text"
              placeholder="Habit To Create"
            />
            <button onClick={createNewHabit} className="create-submit-name">
              Create
            </button>
          </div>
        </section>
        <button className="delete-habit cursor-hover">Delete habit</button>
        <section className="section-delete hidden">
          <div className="delete-box">
            <input
              className="input-delete"
              type="text"
              placeholder="Habit To Delete"
            />
            <button onClick={deleteHabit} className="delete-submit-name">
              Delete
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
