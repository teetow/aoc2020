import React, { FunctionComponent, useEffect, useState } from "react";
import { Day } from "util/Day";

import DayPanel from "./components/DayPanel";
import Picker from "./components/Picker";
import years from "./years/years";

import "./styles.scss";
import "./App.scss";

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

  const currentYear = years.get(currentYearIndex) as Map<number, Day<unknown>>;

  const currentDay = currentYear?.get(currentDayIndex);

  return (
    <div className="my-app">
      <div className="my-app__nav">
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
      </div>
      <div className="my-app__main">
        {currentDay !== undefined && <DayPanel day={currentDay} />}
      </div>

      <div className="my-app__boilerplate">
        <p>
          Made for{" "}
          <a href="https://adventofcode.com/2020">Advent of Code 2020</a>
        </p>
        <p>
          Source at <a href="https://github.com/teetow/aoc2020">GitHub</a>
        </p>
      </div>
    </div>
  );
};
export default App;
