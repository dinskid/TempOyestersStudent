import React, { useState } from 'react';

export default function SliderType({ setAnswer, initialState, options }) {
  const [value, setValue] = useState(initialState || undefined);

  return (
    <div className="slider-wrap"
      style={{
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      }}
    >
      {
        options.map(option => (
          <div
            className="slide-wrap w-100 d-flex justify-content-center flex-column align-items-center"
            key={option[0]}
            onClick={() => {
              setValue(option[1].toString());
              setAnswer(option[1].toString());
            }}
          >
            <div className="component mb-2">{option[0]}</div>
            {console.log(option[1])}
            <div className="radio-mimic">
              <div className={"check " + (value === option[1].toString() ? "" : "d-none")} />
            </div>
          </div>
        ))
      }
    </div>
  );
}