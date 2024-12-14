import React, { forwardRef } from 'react';
import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
    return (
        <div className={classes.inputWrapper}>
            <input ref={ref} {...props} className={classes.input} />
        </div>
    );
});

export default Input;
