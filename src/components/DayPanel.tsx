import classnames from "classnames";
import React, { FunctionComponent } from "react";

import { Day, TestRun } from "util/Day";

import "./DayPanel.scss";

const makeTestResult = ({
  index,
  result,
  runResult,
}: TestRun<string | number>) => {
  const isSuccess = runResult.toString() === result.toString();

  const base = "my-day__testline";
  const lineClasses = classnames({
    [`${base}`]: true,
    [`${base}--is-success`]: isSuccess,
    [`${base}--is-fail`]: result && runResult && !isSuccess,
  });

  const lineText = isSuccess
    ? `passed (got ${result})`
    : `failed (expected ${result}, got ${runResult})`;

  return (
    <div key={index} className={lineClasses}>
      <p>
        test {index} {lineText}
      </p>
    </div>
  );
};

const DayPanel: FunctionComponent<Day<string | number>> = ({
  data,
  parts,
}: Day<string | number>) => {
  return (
    <div className="my-day">
      <div className="my-day__actions" />
      <div className="my-day__parts">
        {parts.map((part) => (
          <div key={part.title} className="my-day__part">
            <div className="my-day__part-title">{part.title}</div>
            <div className="my-day__run-result">
              {data !== undefined ? part.func?.(data) : "no func"}
            </div>
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
        ))}
      </div>
    </div>
  );
};

export default DayPanel;
