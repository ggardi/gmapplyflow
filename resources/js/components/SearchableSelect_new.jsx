import React, { useState, useEffect } from 'react';

const SearchableSelect = ({ label, value, onChange, onSearch, searchResults = [], error, placeholder = "Search loan officers or branches...", className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
        
        if (newSearchTerm.trim() === '') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleOptionSelect = (option) => {
        onChange(option);
        setSearchTerm(option.name);
        setIsOpen(false);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleInputBlur = () => {
        // Delay closing to allow option selection
        setTimeout(() => setIsOpen(false), 150);
    };

    // Update search term when value changes externally
    useEffect(() => {
        if (value && value.name) {
            setSearchTerm(value.name);
        } else {
            setSearchTerm('');
        }
    }, [value]);

    return (
        <div className={`searchable-select ${className}`}>
            <label className="form-label">{label}</label>
            <input
                type="text"
                className={`form-input ${error ? 'form-input--error' : ''}`}
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={placeholder}
            />
            {isOpen && searchResults.length > 0 && (
                <div className="searchable-results">
                    {searchResults.map((option, index) => (
                        <div
                            key={index}
                            className="searchable-item"
                            onMouseDown={() => handleOptionSelect(option)}
                        >
                            <div style={{ fontWeight: 'bold' }}>{option.name}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{option.branch} - {option.state}</div>
                        </div>
                    ))}
                </div>
            )}
            {error && <div className="form-error">{error}</div>}
        </div>
    );
};

export default SearchableSelect;
