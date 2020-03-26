import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ value, onChange, name }) => {
    return <textarea className={styles.root} {...{ value, onChange, name }} />;
};

export default TextArea;
