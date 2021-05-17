import React from 'react';
import { Redirect } from 'react-router';
import { RiArrowGoBackFill } from 'react-icons/ri';

import './styles.css'

/**
 * Iframe shown as a pop-up
 * @param {Object} props
 * @param {string} props.src - Source of the iframe
 * @param {function} props.close - Handler function to close the pop-up
 */
export default function IFrame(props) {
  // TODO: Event listener to receive ESC ans close the pop-up
  return (props.src ?
    <div className="pop-up">
      <button className="back btn btn-primary" onClick={props.close}>
        <RiArrowGoBackFill />
      </button>
      <iframe title="pdf-render" src={props.src} />
    </div>
    : <Redirect to="/error" />
  )
};