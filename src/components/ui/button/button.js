import React from 'react';

import styles from './button.module.css';

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : 'submit'}
      className={styles.btn}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
