import React, { forwardRef } from 'react';

import styles from './input.module.css';

const Input = forwardRef((props, ref) => {
  return (
    <div className={styles['input-container']}>
      <label htmlFor={props.name} className={styles.label}>
        {props.children}
      </label>
      <input
        type={props?.type ? props.type : 'text'}
        ref={ref}
        value={props?.value}
        placeholder={props.placeholder}
        className={`${props.className} ${styles.input} ${
          props?.err && props.err.includes(props.name) ? styles.invalid : ''
        }`}
        name={props?.name}
      />
      {props?.err && props?.err.includes(props?.name) ? (
        <p className={styles.err}>
          {props?.errMsg ? props?.errMsg : `You should fill the ${props.name}`}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
