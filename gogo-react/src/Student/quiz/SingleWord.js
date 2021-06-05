import React, { useState } from 'react';

export default function SingleWord({ setAnswer, initialState }) {
  const [data, setData] = useState(initialState || '');

  return (
    <div className="d-flex justify-content-center">
      <input
        type="text"
        value={data}
        onChange={e => {
          setData(e.target.value);
          setAnswer(e.target.value);
        }}
      />
    </div>
  )
}