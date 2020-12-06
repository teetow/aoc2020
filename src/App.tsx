import React, { FunctionComponent, useState } from "react";
import { HashRouter, Route, useParams } from "react-router-dom";
import { Day } from "util/Day";
import "./App.scss";
import DayPanel from "./components/DayPanel";
import Picker from "./components/Picker";
import "./styles.scss";
import years from "./years/years";

type RouteParams = {
  year: string;
  day: string;
};

const AppMain = () => {
  // eslint-disable-next-line
  const { year, day } = useParams<RouteParams>();
  const yearIndex = Number(year);
  const dayIndex = Number(day) || 1;

  const currentYear = years.get(yearIndex) as Map<number, Day<unknown>>;

  const currentDay = currentYear?.get(dayIndex);

  return (
    <>
      <div className="my-app__nav">
        <Picker
          {...{
            options: Array.from(years.keys()),
            current: yearIndex,
          }}
        />
        {currentYear !== undefined && (
          <Picker
            {...{
              options: Array.from(currentYear.keys()),
              current: dayIndex,
              linkPrefix: `${yearIndex}/`,
            }}
          />
        )}
      </div>
      <div className="my-app__main">
        {currentDay !== undefined && (
          <DayPanel day={currentDay} year={yearIndex} dayIndex={dayIndex} />
        )}
      </div>
    </>
  );
};

const App: FunctionComponent = () => {
  return (
    <HashRouter>
      <div className="my-app">
        <Route exact path="/:year?/:day?">
          <AppMain />
        </Route>

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
    </HashRouter>
  );
};

export default App;
