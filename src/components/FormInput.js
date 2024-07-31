import React from 'react';
import './FormInput.css';

const FormInput = ({ label, ...props }) => {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
};

export default FormInput;
