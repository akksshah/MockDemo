import React from 'react';
import styles from './Select.module.css';

const Select = ({ name, onChange, options }) => {
    return (
        <select name={name} className={styles.root} {...{ onChange }}>
            {options.map(({ display, value, ...props }) => (
                <option key={value} value={value} {...props}>
                    {display}
                </option>
            ))}
        </select>
    );
};

export default Select;
