import React from 'react';
import styles from './Button.module.css';

const Button = ({width, height, backgroundColor, color, onClick, children, type,}) => {
    return (
        <button className={styles.root} style={{ width, height, backgroundColor, color }} {...{ type, onClick }}>
            {children}
        </button>
    );
};

export default Button;
