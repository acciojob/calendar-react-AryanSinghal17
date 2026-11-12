
import React, { useState } from "react";

function App() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editYear, setEditYear] = useState(false);
  const [newYear, setNewYear] = useState(year);

  const days = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const calendar = [];

  for (let i = 0; i < startDay; i++) {
    calendar.push("");
  }

  for (let i = 1; i <= days; i++) {
    calendar.push(i);
  }

  while (calendar.length % 7 !== 0) {
    calendar.push("");
  }

  const rows = [];

  for (let i = 0; i < calendar.length; i += 7) {
    rows.push(calendar.slice(i, i + 7));
  }

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handlePreviousYear = () => {
    setYear((prev) => prev - 1);
  };

  const handleNextYear = () => {
    setYear((prev) => prev + 1);
  };

  const handleYearSave = () => {
    const value = Number(newYear);

    if (Number.isInteger(value) && value >= 1 && value <= 9999) {
      setYear(value);
    }

    setEditYear(false);
  };

  return (
    <div className="calendar-container">
      <h1 id="calendar-heading">Calendar</h1>

      <div className="calendar-controls">

        <button id="prev-year" onClick={handlePreviousYear}>
          Previous Year
        </button>

        <button id="prev-month" onClick={handlePreviousMonth}>
          Previous Month
        </button>

        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>

        {editYear ? (
          <input
            id="year-input"
            type="number"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            onBlur={handleYearSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleYearSave();
              if (e.key === "Escape") setEditYear(false);
            }}
            autoFocus
          />
        ) : (
          <span
            id="year-display"
            onDoubleClick={() => {
              setNewYear(year);
              setEditYear(true);
            }}
          >
            {year}
          </span>
        )}

        <button id="next-month" onClick={handleNextMonth}>
          Next Month
        </button>

        <button id="next-year" onClick={handleNextYear}>
          Next Year
        </button>

      </div>

      <table id="calendar-table">
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <th key={day}>{day}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map((week, index) => (
            <tr key={index}>
              {week.map((day, i) => (
                <td key={i}>{day}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
