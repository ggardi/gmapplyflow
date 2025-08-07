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
        <div className={`relative mb-6 ${className}`}>
            {/* Input Field */}
            <input
                type={type}
                value={value}
                className={`
                    peer w-full px-3 py-4 text-gray-900 placeholder-transparent
                    border border-gray-300 rounded-lg bg-white
                    focus:outline-none focus:ring-0 
                    transition-all duration-200 ease-out
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                    }
                `}
                placeholder={label}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                {...props}
            />

            {/* Floating Label */}
            <label
                className={`
                    absolute left-3 transition-all duration-200 ease-out
                    pointer-events-none select-none
                    ${
                        isLabelFloating
                            ? `
                            -top-2 text-xs px-1 bg-white
                            ${
                                error
                                    ? "text-red-500"
                                    : isFocused
                                    ? "text-blue-500"
                                    : "text-gray-600"
                            }
                        `
                            : `
                            top-4 text-base
                            ${error ? "text-red-400" : "text-gray-400"}
                        `
                    }
                `}
            >
                {label}
            </label>

            {/* Error Message */}
            {error && (
                <div className="mt-1 text-sm text-red-500 px-3">{error}</div>
            )}
        </div>
    );
};

export default FloatingLabelInput;
