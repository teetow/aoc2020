import classnames from "classnames";
import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { Day, DayPart, TestRun } from "util/Day";
import prettyPerfTimer from "util/time";
import DataViewer from "./DataViewer";

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
    : `failed (expected ${result.toString()}, 
       got ${runResult?.toString() || "nothing"})`;

  return (
    <div key={index} className={lineClasses}>
      <span>
        test {index} {lineText}
      </span>
    </div>
  );
};

const runDayPart = (day: Day<unknown>, part: DayPart<unknown>) => {
  const t0 = performance.now();
  const rs = part.func(day.dataConv(day.data));
  const t1 = performance.now() - t0;
  return (
    <>
      <div className="my-day__run-result">{rs}</div>
      <div className="my-day__time">{prettyPerfTimer(t1)}</div>
    </>
  );
};

const makeDay = (day: Day<unknown>, part: DayPart<unknown>) => {
  return (
    <div key={part.title} className="my-day__part">
      <div className="my-day__part-title">{part.title}</div>
      {part.description && (
        <div className="my-day__part-desc">
          <ReactMarkdown>{part.description}</ReactMarkdown>
        </div>
      )}
      <div className="my-day__test-result">
        {part.tests?.map((test, index) =>
          makeTestResult({
            index,
            runResult: part.func?.(
              day.dataConv !== undefined
                ? day.dataConv(test.data as string)
                : test.data
            ),
            ...test,
          })
        )}
      </div>
      {part.func && runDayPart(day, part)}
    </div>
  );
};

type Props = {
  day: Day<unknown>;
  year: number;
  dayIndex: number;
};

const DayPanel: FunctionComponent<Props> = ({ day, year, dayIndex }: Props) => {
  const { data, parts, title, description, dataConv } = day;

  return (
    <div className="my-day">
      <div className="my-day__title">{title}</div>
      <div className="my-day__dayindex">Day {dayIndex}</div>

      {description && (
        <div className="my-day__desc">
          <ReactMarkdown>
            {`${description}
            
[Read full story](https://adventofcode.com/${year}/day/${dayIndex})

[View solution on GitHub](https://github.com/teetow/aoc2020/blob/master/src/years/${year}/day${dayIndex}.ts)

`}
          </ReactMarkdown>
        </div>
      )}

      {data && (
        <div className="my-day__sampledata">
          <DataViewer data={data} />
        </div>
      )}

      <div className="my-day__parts">
        {parts.map((part) => makeDay(day, part))}
      </div>
    </div>
  );
};

export default DayPanel;
