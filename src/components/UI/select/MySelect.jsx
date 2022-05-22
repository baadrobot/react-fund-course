import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value="">{defaultValue}</option>
            {options.map(optionMap =>
                <option key={optionMap.value} value={optionMap.value}>
                    {optionMap.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;