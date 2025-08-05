import React from 'react';

const FormInput = ({ label, error, className = '', ...props }) => {
    return (
        <div className="form-field">
            <label className="form-label">{label}</label>
            <input 
                className={`form-input ${error ? 'form-input--error' : ''} ${className}`}
                {...props}
            />
            {error && <div className="form-error">{error}</div>}
        </div>
    );
};

export default FormInput;
