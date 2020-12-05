import React, { FunctionComponent, useEffect, useState } from "react";
import { Day } from "util/Day";

import DayPanel from "./components/DayPanel";
import Picker from "./components/Picker";
import years from "./years/years";

import "./styles.scss";
import "./App.scss";

const parseLocationPath = (path: string): { year: number; day: number } => {
  const [year, day] = path.split("/").slice(-2);
  return { year: Number(year) || 0, day: Number(day) || 0 };
};

const App: FunctionComponent = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(
    parseLocationPath(window.location.pathname).year ||
      Number(localStorage.getItem("currentYear") || "")
  );

  const [currentDayIndex, setCurrentDayIndex] = useState(
    parseLocationPath(window.location.pathname).day ||
      Number(localStorage.getItem("currentDay") || "")
  );

  useEffect(() => {
    window.history.pushState(
      null,
      document.title,
      `/aoc2020/${currentYearIndex}/${currentDayIndex}`
    );
  }, [currentYearIndex, currentDayIndex]);

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
        {currentDay !== undefined && (
          <DayPanel
            day={currentDay}
            year={currentYearIndex}
            dayIndex={currentDayIndex}
          />
        )}
      </div>

      <div className="my-app__boilerplate">
        <span>
          Made for{" "}
          <a href="https://adventofcode.com/2020">Advent of Code 2020</a>
        </span>
        <span>
          Source at <a href="https://github.com/teetow/aoc2020">GitHub</a>
        </span>
      </div>
    </div>
  );
};
export default App;
