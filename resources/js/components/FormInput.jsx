import React from 'react';

const FormInput = ({ label, error, className = '', ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input 
                className={`
                    w-full px-3 py-2 border rounded-lg shadow-sm
                    focus:outline-none focus:ring-2 focus:border-transparent
                    transition-all duration-200
                    ${error 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    }
                    ${className}
                `}
                {...props}
            />
            {error && (
                <div className="mt-1 text-sm text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormInput;
