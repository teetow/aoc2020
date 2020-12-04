import React from "react";

const makeSample = (data: string): string => {
  return data.split("\n").slice(0, 5).join("\n");
};

type Props = {
  data: string;
};

const DataViewer = ({ data }: Props) => {
  return <div className="my-day__data">{makeSample(data)}</div>;
};

export default DataViewer;
