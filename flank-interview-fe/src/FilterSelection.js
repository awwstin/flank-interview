// src/FilterSelection.js
import React from 'react';
import './FilterSelection.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterSelection = ({ options, selected, setSelected }) => {
    const handleButtonClick = (index) => {
        const option = options[index];

        if (option.value === null) {  // 'All' button clicked
            setSelected(prevSelected => {
                // If 'All' is already selected, deselect it
                if (prevSelected.length === 1 && prevSelected[0].value === null) {
                    return [];
                }
                // Otherwise, select 'All' and deselect other options
                return [option];
            });
            return;
        }

        const currentOptionIndexInSelected = selected.findIndex(item => item.value === option.value);

        // If the option is already selected, deselect it
        if (currentOptionIndexInSelected >= 0) {
            setSelected(prevSelected => prevSelected.filter(item => item.value !== option.value));
            return;
        }

        // If it's a new selection
        setSelected(prevSelected => {
            // Find the bounds for the range
            let minIndex = Math.min(...[...prevSelected, option].map(item => options.findIndex(opt => opt.value === item.value)));
            let maxIndex = Math.max(...[...prevSelected, option].map(item => options.findIndex(opt => opt.value === item.value)));

            // Select the entire range including the new option
            const newRange = options.slice(minIndex, maxIndex + 1);

            // Return the union of previously selected and the new range, avoiding duplicates
            return [...new Set([...prevSelected, ...newRange])];
        });
    };

    return (
        <div className='options'>
            {options.map((option, index) => (
                <button
                    type='button'
                    key={option.value}
                    className={`btn ${selected.includes(option) ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(index)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default FilterSelection;

