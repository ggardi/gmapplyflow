import React from 'react';

const Alert = ({ children, type = 'success', className = '' }) => {
    const baseClasses = 'alert';
    const typeClasses = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info'
    };

    const classes = `${baseClasses} ${typeClasses[type] || typeClasses.success} ${className}`;

    return <div className={classes}>{children}</div>;
};

export default Alert;
