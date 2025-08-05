import React from 'react';

const Select = ({ label, options, value, onChange, error, placeholder = "Please select...", className = '', onBlur }) => {
    const handleChange = (newValue) => {
        onChange(newValue);
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(value);
        }
    };

    return (
        <div className="form-field">
            <label className="form-label">{label}</label>
            <select 
                className={`form-select ${error ? 'form-select--error' : ''} ${className}`}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="form-error">{error}</div>}
        </div>
    );
};

export default Select;
