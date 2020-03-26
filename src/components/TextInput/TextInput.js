import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({value, onChange, name}) => {
    return <input className={styles.input} type="text" {...{value, onChange, name}} />;
};

export default TextInput;
