import React from 'react';

const FormRow = ({ children, className = '' }) => {
    return (
        <div className={`form-row ${className}`}>
            {children}
        </div>
    );
};

export default FormRow;
