import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({placeholder, value, onChange, name}) => {
    return <input className={styles.input} placeholder={placeholder} type="text" {...{value, onChange, name}} />;
};

export default TextInput;
