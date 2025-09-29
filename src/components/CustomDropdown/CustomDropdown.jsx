import React, { useState, useRef, useEffect, useCallback } from 'react';
import css from './CustomDropdown.module.css';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';

const CustomDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option",
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const option = options.find(option => option.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  }, [disabled, isOpen]);

  const handleOptionClick = useCallback((option) => {
    if (selectedOption?.value !== option.value) {
      setSelectedOption(option);
      onChange(option.value);
    } else {
      setSelectedOption(option);
    }
    setIsOpen(false);
  }, [selectedOption?.value, onChange]);

  const isPlaceholder = !selectedOption || selectedOption.value === '';

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={`${css.select} ${isOpen ? css.open : ''} ${disabled ? css.disabled : ''} ${isPlaceholder ? css.placeholder : ''}`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className={css.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <img
          src={chevronDownIcon}
          alt="Dropdown arrow"
          className={`${css.chevron} ${isOpen ? css.rotated : ''}`}
        />
      </button>

      {isOpen && (
        <div className={css.dropdownList}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${css.option} ${
                selectedOption?.value === option.value ? css.selected : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
