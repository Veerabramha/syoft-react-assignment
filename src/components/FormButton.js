import React from 'react';
import './FormButton.css';

const FormButton = ({ text, ...props }) => {
  return (
    <button className="form-button" {...props}>
      {text}
    </button>
  );
};

export default FormButton;
