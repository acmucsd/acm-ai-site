import React, { useState } from 'react';
import CountUp from 'react-countup';
import { InView } from 'react-intersection-observer';
import './index.less';

// https://github.com/acmucsd/main-website/blob/main/src/components/Statistic/index.tsx
interface NumberProps {
  color: string;
  description: string;
  prepend: string;
  extension: string;
  number: number;
}

const Number = ({
  color,
  description,
  prepend,
  extension,
  number,
}: NumberProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="number"
      style={{
        borderColor: color,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        <InView
          as="div"
          onChange={(inView) => {
            if (!isVisible && inView) setIsVisible(true);
          }}
        >
          {isVisible ? (
            <CountUp
              className={`count ${color}`}
              start={0}
              end={number}
              prefix={prepend}
              suffix={extension}
              redraw
            />
          ) : (
            <span className="count">
              {prepend}0{extension}
            </span>
          )}
        </InView>
      </span>
      <span className="description">{description}</span>
    </div>
  );
};

export default Number;
