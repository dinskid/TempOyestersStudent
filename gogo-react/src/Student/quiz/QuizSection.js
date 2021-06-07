import React, { useEffect, useState } from 'react';

export default function QuizSections({ status, sectionNames, setSection, setQuestion }) {
  // array of sections - each section is an array containing 0 | 1 | 2 | 3
  // 0 := not visited; 1 := answered; 2 := visited and not answered; 3 := marked for review
  // const [status, setStatus] = useState(JSON.parse(localStorage.getItem('QUIZ_STATUS')) || []);
  // const [sectionNames, setSectionNames] = useState([]);

  // useEffect(() => {
  //   if (status.length === 0) {
  //     // status has to be initialised from sections info
  //     setStatus(sections.map(section => Array(section.section_no_of_ques).fill(0)));
  //   }
  //   setSectionNames(sections.map(section => section.section_name));
  //   // status.length === sectionNames.length
  // }, [sections]);

  // useEffect(() => {
  //   // any changes to status must be written to localStorage
  //   localStorage.setItem('QUIZ_STATUS', JSON.stringify(status));
  // }, [status]);

  let c = 1;
  return (
    <div className="sections-wrap">
      {
        status.map((section, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className="section-title mb-2 mt-3">{sectionNames[idx]}</div>
              <div className="section-body">
                {
                  section.map((qStatus, jdx) => (
                    <div
                      className={"btn rounded-0 question mb-2 font-weight-bold d-flex justify-content-center align-items-center " +
                        (qStatus === 1 ? 'answered' : '') +
                        (qStatus === 2 ? 'not-answered' : '') +
                        (qStatus === 3 ? 'marked' : '')
                      }
                      role="button"
                      onClick={() => {
                        console.log('clicked: ', idx, ' ', jdx)
                        setSection(idx);
                        setQuestion(jdx);
                      }}
                      key={jdx}>
                      {c++}
                    </div>
                  ))
                }
              </div>
            </React.Fragment>
          );
        })
      }
    </div >
  );
}