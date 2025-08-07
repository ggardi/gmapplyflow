import React, { useState, useEffect } from "react";

const FloatingLabelInput = ({
    label,
    error,
    className = "",
    type = "text",
    value = "",
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    // Update hasValue when the value prop changes
    useEffect(() => {
        setHasValue(value !== "" && value !== null && value !== undefined);
    }, [value]);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
        if (props.onBlur) {
            props.onBlur(e);
        }
    };

    const handleChange = (e) => {
        setHasValue(e.target.value !== "");
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const isLabelFloating = isFocused || hasValue;

    return (
        <div className={`floating-container ${className}`}>
            {/* Input Container with Border */}
            <div
                className={`floating-border ${
                    error ? "floating-border--error" : ""
                }`}
            >
                {/* Input Field */}
                <input
                    type={type}
                    value={value}
                    className={`floating-input-material ${
                        isLabelFloating
                            ? "floating-input-material--floating"
                            : "floating-input-material--default"
                    }`}
                    placeholder={label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...props}
                />

                {/* Floating Label */}
                <label
                    className={`floating-label-material ${
                        isLabelFloating
                            ? "floating-label-material--floating"
                            : "floating-label-material--default"
                    } ${
                        error
                            ? "floating-label-material--error"
                            : isFocused
                            ? "floating-label-material--focused"
                            : ""
                    }`}
                >
                    {label}
                </label>
            </div>

            {/* Error Message */}
            {error && <div className="floating-error">{error}</div>}
        </div>
    );
};

export default FloatingLabelInput;
