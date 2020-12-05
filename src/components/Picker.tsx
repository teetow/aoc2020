import classnames from "classnames";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import "./Picker.scss";

type Props = {
  options: number[];
  current: number;
  linkPrefix?: string;
};

const Picker: FunctionComponent<Props> = ({
  options,
  current,
  linkPrefix,
}: Props) => {
  const base = "my-picker";

  const getDayClasses = (index: number) => {
    return classnames({
      [`${base}__option`]: true,
      [`${base}__option--current`]: index === current,
    });
  };

  return (
    <div className={`${base}`}>
      {Array.from(options).map((value) => (
        <Link to={`/${linkPrefix || ""}${value}`} key={value}>
          <div className={getDayClasses(value)}>{value}</div>
        </Link>
      ))}
    </div>
  );
};

export default Picker;
