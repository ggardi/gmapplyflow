import React from 'react';
import FormInput from '../components/FormInput';
import FloatingLabelInput from '../components/FloatingLabelInput';

const InputDemo = () => {
    return (
        <div className="max-w-md mx-auto p-8 space-y-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
                Input Components Demo
            </h1>
            
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Regular Form Input
                </h2>
                <FormInput 
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                />
                <FormInput 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error="Password is required"
                />
            </div>
            
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Floating Label Inputs
                </h2>
                <div className="space-y-4">
                    <FloatingLabelInput 
                        label="Full Name"
                        type="text"
                    />
                    <FloatingLabelInput 
                        label="Email Address"
                        type="email"
                    />
                    <FloatingLabelInput 
                        label="Phone Number"
                        type="tel"
                        error="Please enter a valid phone number"
                    />
                </div>
            </div>
        </div>
    );
};

export default InputDemo;
