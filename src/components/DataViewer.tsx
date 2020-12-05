import React from "react";

import "./DataViewer.scss";

const makeSample = (data: string): string => {
  return data.split("\n").slice(0, 5).join("\n");
};

type Props = {
  data: string;
  title?: string;
};

const DataViewer = ({ data, title = "Sample data" }: Props) => {
  return (
    <div className="my-day__dataview">
      <div className="my-day__dataview-title">{title}</div>
      <div className="my-day__dataview-data">{makeSample(data)}</div>
    </div>
  );
};

export default DataViewer;
