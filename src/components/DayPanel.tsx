import classnames from "classnames";
import React, { FunctionComponent } from "react";

import { Day, DayPart, TestRun } from "util/Day";
import prettyPerfTimer from "util/time";
import day1data from "years/2015/data/day1";

import "./DayPanel.scss";

const makeTestResult = ({
  index,
  result,
  runResult,
}: TestRun<number | string | boolean>) => {
  const isSuccess = runResult === result;

  const base = "my-day__testline";
  const lineClasses = classnames({
    [`${base}`]: true,
    [`${base}--is-success`]: isSuccess,
    [`${base}--is-fail`]: result && runResult && !isSuccess,
  });

  const lineText = isSuccess
    ? `passed (got ${result.toString()})`
    : `failed (expected ${result.toString()}, got ${runResult.toString()})`;

  return (
    <div key={index} className={lineClasses}>
      <span>
        test {index} {lineText}
      </span>
    </div>
  );
};

const makeDay = (part: DayPart<unknown>, data: unknown) => {
  const t0 = performance.now();
  const rs = day1data !== undefined ? part.func?.(data) : "no func";
  const t1 = performance.now() - t0;

  return (
    <div key={part.title} className="my-day__part">
      <div className="my-day__part-title">{part.title}</div>
      <div className="my-day__run-result">{rs}</div>
      <div className="my-day__time">{prettyPerfTimer(t1)}</div>
      <div className="my-day__test-result">
        {part.tests?.map((test, index) =>
          makeTestResult({
            index,
            runResult: part.func?.(test.data) || "",
            ...test,
          })
        )}
      </div>
    </div>
  );
};

type Props = {
  day: Day<unknown>;
};

const DayPanel: FunctionComponent<Props> = ({ day }: Props) => {
  const { data, parts } = day;

  return (
    <div className="my-day">
      <div className="my-day__actions" />
      <div className="my-day__parts">
        {parts.map((part) => makeDay(part, data))}
      </div>
    </div>
  );
};

export default DayPanel;
