import React from 'react';

import styles from './sideImage.module.css';

const urlSign =
  'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const urlLog =
  'https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const SideImage = ({ isSignup }) => {
  const title = isSignup
    ? 'Take Charge of Your Tasks'
    : 'Welcome to our Kanban app';

  const style = {
    '--url': isSignup ? `url(${urlSign})` : `url(${urlLog})`,
    '--titleColor': isSignup ? '#d05249' : '#aac7ff',
  };

  return (
    <div className={styles['side-auth']} style={style}>
      <div className={styles['text-container']}>
        <h2 className={styles.title}>{title}</h2>
        {isSignup ? (
          <p className={styles.textSign}>
            Join our community of goal achievers! Sign up now to experience the
            convenience of our Kanban app and conquer your tasks with ease.
          </p>
        ) : (
          <p className={styles.textLog}>
            The easy way to manage tasks and boost productivity! Organize,
            prioritize, and conquer your goals together with our intuitive
            Kanban board.
          </p>
        )}
      </div>
    </div>
  );
};

export default SideImage;
