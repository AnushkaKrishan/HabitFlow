import { updateProgressBar } from "../components/Habit";
export let habitsArray = [];

export function getFromStorage() {
  const data = localStorage.getItem("MainHabitArray");
  if (data) {
    habitsArray = JSON.parse(data); // Assign the stored data AFTER defining habitsArray
  } else {
    habitsArray = [
      {
        id: 1,
        isCompleted: false,
        title: "Morning Exercise",
        createdOn: "2025-01-01",
        currentStreak: 0,
        bestStreak: 0,
        completions: [
          "2025-01-01",
          "2025-01-02",
          "2025-01-03",
          "2025-02-04",
          "2025-02-05",
        ],
      },
      {
        id: 2,
        isCompleted: false,
        title: "Reading Books",
        createdOn: "2024-12-15",
        currentStreak: 0,
        bestStreak: 0,
        completions: [],
      },
      {
        id: 3,
        isCompleted: false,
        title: "Drinking Water",
        createdOn: "2024-11-20",
        currentStreak: 0,
        bestStreak: 0,
        completions: [],
      },
      {
        id: 4,
        isCompleted: false,
        title: "Coding Practice",
        createdOn: "2024-10-10",
        currentStreak: 0,
        bestStreak: 0,
        completions: [],
      },
    ];
  }
}

// Call the function at the start to populate habitsArray
getFromStorage();

export function toggleCompletion(id) {
  habitsArray[id - 1].isCompleted = !habitsArray[id - 1].isCompleted;
}

export function calcStreak(id) {
  let h = habitsArray[id - 1];
  h.currentStreak = 0;
  // h.bestStreak = 1;
  if (h.completions.length === 0) {
    h.currentStreak = 0;
    h.bestStreak = 0;
  } else if (h.completions.length === 1) {
    h.currentStreak = 1;
    h.bestStreak = 1;
  } else {
    let dates = h.completions.map((date) =>
      new Date(date).setHours(0, 0, 0, 0)
    );
    let chunkDates = splitIntoChunks(dates);

    chunkDates.forEach(function (chunk) {
      if (chunk.length > h.bestStreak) {
        h.bestStreak = chunk.length;
      }
      if (chunk.includes(new Date().setHours(0, 0, 0, 0))) {
        h.currentStreak = chunk.length;
      }
    });
  }
}

function splitIntoChunks(arr) {
  const chunks = [];
  let currentChunk = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    // Check if the current number is consecutive to the previous one
    if ((arr[i] - arr[i - 1]) / (1000 * 60 * 60 * 24) === 1) {
      currentChunk.push(arr[i]);
    } else {
      // If not consecutive, push the current chunk and start a new one
      chunks.push(currentChunk);
      currentChunk = [arr[i]];
    }
  }

  // Push the last chunk if it exists
  chunks.push(currentChunk);

  return chunks;
}

export function updateHabitBar(habitID) {
  let month = new Date().getMonth();
  let daysInMonth;
  let completionsThisMonth = 0;
  habitsArray[habitID - 1].completions.forEach(function (h, i) {
    let hMonth = new Date(h).getMonth();
    if (hMonth === month) {
      completionsThisMonth++;
    }
  });

  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
    daysInMonth = 31;
  } else if ([3, 5, 8, 10].includes(month)) {
    daysInMonth = 30;
  } else if (month === 1) {
    let year = new Date().getFullYear();
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth = 29;
    } else {
      daysInMonth = 28;
    }
  }
  document.querySelector(
    `.habit--${habitID} .habit-progress-done`
  ).style.width = `${(completionsThisMonth * 100) / daysInMonth}%`;
  document.querySelector(
    `.habit--${habitID} .habit-progress-done`
  ).textContent = `${Math.round((completionsThisMonth * 100) / daysInMonth)}%`;
}
