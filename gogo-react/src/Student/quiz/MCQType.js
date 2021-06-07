import React, { useEffect, useState } from 'react';

export default function MCQType({ setAnswer, initialState, type, options }) {
  const [selected, setSelected] = useState(initialState || Array(options.length).fill(false));

  useEffect(() => {
    // console.log(selected);
    const requiredOptions = [];
    options.forEach((option, idx) => {
      if (selected[idx]) requiredOptions.push(option.option_body);
    });
    setAnswer(JSON.stringify(requiredOptions));
  }, [selected]);

  if (!options) return null;

  return (
    <>
      {
        type === 'single_correct_type' ?
          <>
            {
              options.map((option, idx) => {
                return (
                  <div className="option-wrap border border-primary rounded p-2 d-flex flex-column justify-content-center mb-3" role="button" key={option.option_body}
                    onClick={() => {
                      const newSelected = Array(options.length).fill(false);
                      newSelected[idx] = true;
                      setSelected(newSelected);
                    }}>
                    {/* {console.log(option)} */}
                    <div className="radio-mimic mcq-type" id={option.option_body}>
                      <div className={"check " + (selected[idx] ? "" : "d-none")} />
                    </div>
                    {/* <input
                      type="radio"
                      id={option.option_body}
                      name="options"
                      checked={selected[idx]}
                      onChange={() => {
                        const newSelected = Array(options.length).fill(false);
                        newSelected[idx] = true;
                        setSelected(newSelected);
                      }}
                    /> */}
                    <label className={"mx-4 m-0 " + (selected[idx] ? "text-primary" : "")} htmlFor={option.option_body}>{option.option_body}</label>
                    {
                      option.option_body_img &&
                      <div className="option-img-wrap d-flex justify-content-center align-items-center">
                        <img src={option.option_body_img} alt="option-related-image" className="option-img" />
                      </div>
                    }
                  </div>
                );
              })
            }
          </>
          :
          <>
            <div className="mcq-info text-secondary mb-2">Multi correct</div>
            {
              options.map((option, idx) => {
                return (
                  <div className="option-wrap border border-primary rounded p-2 d-flex flex-column justify-content-center mb-3" role="button" key={option.option_body}
                    onClick={() => {
                      const newSelected = [...selected];
                      newSelected[idx] = !newSelected[idx];
                      setSelected(newSelected);
                    }}>
                    {/* {console.log(option)} */}
                    <div className="radio-mimic mcq-type" id={option.option_body}>
                      <div className={"check " + (selected[idx] ? "" : "d-none")} />
                    </div>
                    {/* <input
                      type="radio"
                      id={option.option_body}
                      checked={selected[idx]}
                      onChange={() => {
                        const newSelected = Array(options.length).fill(false);
                        newSelected[idx] = true;
                        setSelected(newSelected);
                      }}
                    /> */}
                    <label className={"mx-4 m-0 " + (selected[idx] ? "text-primary" : "")} htmlFor={option.option_body}>{option.option_body}</label>
                    {
                      option.option_body_img &&
                      <div className="option-img-wrap d-flex justify-content-center align-items-center">
                        <img src={option.option_body_img} alt="option-related-image" className="option-img" />
                      </div>
                    }
                  </div>
                );
              })
            }
          </>
      }
    </>
  );
}