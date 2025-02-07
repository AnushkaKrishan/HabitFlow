export function Header() {
  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "The secret of your future is hidden in your daily routine. – Mike Murdock",
    "Discipline is the bridge between goals and accomplishment. – Jim Rohn",
    "Habits are the compound interest of self-improvement. – James Clear",
    "The key to success is to start before you are ready. – Marie Forleo",
    "Small daily improvements over time lead to stunning results. – Robin Sharma",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "Your habits will determine your future. – Jack Canfield",
    "Success is the result of small efforts, repeated. – R. L. Adams",
    "The best way to predict the future is to create it. – Abraham Lincoln",
  ];
  return (
    <section className="section-header">
      <div className="masking-container">
        <p className="top-logo masked-text">HABITFLOW</p>
      </div>
      <p className="top-quote">{quotes[Math.trunc(Math.random() * 9) + 1]}</p>
      <div className="top-progress-bar">
        <div className="progress-done">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#f8f7f3"
            viewBox="0 0 256 256"
          >
            <path d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
