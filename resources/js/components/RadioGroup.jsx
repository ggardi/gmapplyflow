import React from 'react';

const RadioGroup = ({ label, options, value, onChange, error, name, className = '', onBlur }) => {
    const handleChange = (newValue) => {
        onChange(newValue);
    };

    const handleBlur = () => {
        if (onBlur) {
            onBlur(value);
        }
    };

    return (
        <div className={`radio-group ${className}`}>
            <label className="form-label">{label}</label>
            <div className="radio-options" onBlur={handleBlur}>
                {options.map((option) => (
                    <div key={option.value} className="radio-item">
                        <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => handleChange(e.target.value)}
                            className="radio-input"
                        />
                        <label 
                            htmlFor={`${name}-${option.value}`}
                            className="radio-label"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {error && <div className="form-error">{error}</div>}
        </div>
    );
};

export default RadioGroup;
