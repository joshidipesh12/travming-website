import {motion} from 'framer-motion';
import React from 'react';
import styles from '../styles/Modal.module.css';

const dropIn = {
  hidden: {
    scale: 0,
    opacity: 0,
    y: '30vh',
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
  exit: {
    scale: 0,
    opacity: 0,
    y: '30vh',
  },
};

function Modal({close, isVisible, children}) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      onClick={close}
      className={styles.backdrop}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.container}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
