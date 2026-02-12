import React, { useState } from 'react';

const FloatingLabelSelect = ({ className , label, id, required, value, onChange, options }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative mt-6 mx-5">
            <select
                id={id}
                name={id}
                className="block w-full appearance-none focus:outline-none border-b-2 rounded-none border-gray-300 focus:border-blue-500 bg-transparent pt-4 pb-1 bg-[url('./registration-form/select-arrow.png')] bg-no-repeat bg-right bg-gray-1200"
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
            >
                

                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label
                htmlFor={id}
                className={`absolute left-0 top-2 text-gray-600 font-semibold transition-all duration-300 ease-in-out transform ${value || isFocused
                    ? '-translate-y-4 scale-75'
                    : 'translate-y-0 scale-100'
                    } origin-top-left pointer-events-none `}
            >
                {label} {required && <span className="text-red-500">*</span>} 
               
            </label>
            
          {(required && value === '' )? <label 
                className="error font-semibold text-left text-red-500">
                    Please select the {label}
            </label> : ''}
        </div>
    );
};

export default FloatingLabelSelect;
