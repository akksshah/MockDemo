import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ label, onChange, checked }) => {
    return (
        <label className={styles.root}>
            <input type="checkbox" {...{ checked }} onChange={e => onChange(e.target.checked)} />
            {label}
        </label>
    );
};

export default Checkbox;
