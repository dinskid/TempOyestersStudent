import React, { useState } from 'react';

export default function IntegerType({ setAnswer, initialState, className }) {
  const [data, setData] = useState(initialState || '');

  return (
    <>
      <div className={className}>Type your answer below</div>
      <div className="d-flex justify-content-center">
        <input
          placeholder="Enter numeric value"
          type="number"
          value={data}
          onChange={e => {
            setData(e.target.value);
            setAnswer(e.target.value);
          }}
        />
      </div>
    </>
  )
}