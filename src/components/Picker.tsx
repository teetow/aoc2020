import classnames from "classnames";
import React, { FunctionComponent } from "react";

import "./Picker.scss";

type Props = {
  options: number[];
  current: number;
  onChange: (index: number) => void;
};

const Picker: FunctionComponent<Props> = ({
  options,
  current,
  onChange,
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
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => onChange?.(value)}
          key={value}
          className={getDayClasses(value)}
          onClick={() => onChange?.(value)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default Picker;
