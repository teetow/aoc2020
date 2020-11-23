import React, { FunctionComponent, useEffect, useState } from "react";

import years from "./years/years";
import DayPanel from "./components/DayPanel";
import Picker from "./components/Picker";

import "./styles.scss";

const App: FunctionComponent = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(
    Number(localStorage.getItem("currentYear") || "")
  );

  const [currentDayIndex, setCurrentDayIndex] = useState(
    Number(localStorage.getItem("currentDay") || "")
  );

  useEffect(
    () => localStorage.setItem("currentDay", currentDayIndex.toString()),
    [currentDayIndex]
  );

  useEffect(
    () => localStorage.setItem("currentYear", currentYearIndex.toString()),
    [currentYearIndex]
  );

  const currentYear = years.get(currentYearIndex);

  const currentDay = currentYear?.get(currentDayIndex);

  return (
    <div className="App">
      <Picker
        {...{
          options: Array.from(years.keys()),
          onChange: (year) => setCurrentYearIndex(year),
          current: currentYearIndex,
        }}
      />
      {currentYear !== undefined && (
        <Picker
          {...{
            options: Array.from(currentYear.keys()),
            onChange: (day) => setCurrentDayIndex(day),
            current: currentDayIndex,
          }}
        />
      )}
      {currentDay !== undefined && <DayPanel {...currentDay} />}
    </div>
  );
};
export default App;
