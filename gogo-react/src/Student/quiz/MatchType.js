import React, { useState } from 'react';

const Row = ({ children, size, className }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, justifyItems: 'center', alignItems: 'center' }} className={className}>
      {children}
    </div >
  );
}

export default function MatchType({ setAnswer, initialState, options }) {
  const rhs = options.map(option => option[1]);
  const lhs = options.map(option => option[0]);

  const [selected, setSelected] = useState(initialState || lhs.map(row => [row, ""]));

  const size = options.length + 1;

  return (
    <div className="match-wrap">
      <Row size={size} className="p-2">
        <div />
        {
          rhs.map(item => <div key={item}>{item}</div>)
        }
      </Row>
      {
        lhs.map((item, idx) => {
          return (
            <Row size={size} key={idx} className="light-bg match-row mb-3 p-2 rounded">
              <div>{item}</div>
              {
                rhs.map((jtem, jdx) => {
                  return (
                    <div
                      onClick={() => {
                        const newSelected = [...selected];
                        newSelected[idx][1] = jtem;
                        setSelected(newSelected);
                        setAnswer(newSelected);
                      }}
                      key={jdx}>
                      <div className="radio-mimic">
                        <div className={"check " + (selected[idx][1] === jtem ? "" : "d-none")} />
                      </div>
                    </div>
                  );
                })
              }
            </Row>
          );
        })
      }
      {/* <table className="w-100 match-table">
        <tbody>
          <tr className="bg-transparent">
            <td></td>
            {
              rhs.map(item => <td key={item}>{item}</td>)
            }
          </tr>
          {
            lhs.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item}</td>
                  {
                    rhs.map((jtem, jdx) => {
                      return (
                        <td
                          onClick={() => {
                            const newSelected = [...selected];
                            newSelected[idx][1] = jtem;
                            setSelected(newSelected);
                            setAnswer(newSelected);
                          }}
                          key={jdx}>
                          <div className="radio-mimic">
                            <div className={"check " + (selected[idx][1] === jtem ? "" : "d-none")} />
                          </div>
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table> */}
    </div>
  );

}