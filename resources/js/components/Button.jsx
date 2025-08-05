import React from 'react';

const Button = ({ children, variant = 'primary', disabled = false, className = '', ...props }) => {
    const baseClasses = 'btn btn-full';
    const variantClasses = {
        primary: 'btn-primary',
        success: 'btn-success',
        danger: 'btn-danger',
        secondary: 'btn-secondary'
    };

    const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;

    return (
        <button className={classes} disabled={disabled} {...props}>
            {children}
        </button>
    );
};

export default Button;
