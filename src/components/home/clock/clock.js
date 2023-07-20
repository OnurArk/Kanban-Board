import { useEffect, useState } from 'react';

import styles from './clock.module.css';

const Clock = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const wsUrl = 'ws://134.209.207.128/ws/server_time/';
    const newSocket = new WebSocket(wsUrl);

    // Handle WebSocket open event
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Handle WebSocket message event
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { date, time } = data;
        setDate(date);
        setTime(time);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    // Handle WebSocket close event
    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div className={styles['clock-container']}>
      <p className={styles.date}>{date}</p>
      <p className={styles.time}>{time}</p>
      <p className={styles.text}>May the Force Be With You!</p>
    </div>
  );
};

export default Clock;
