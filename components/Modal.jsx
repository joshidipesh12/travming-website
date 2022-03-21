import {motion} from 'framer-motion';
import React from 'react';

const dropIn = {
  hidden: {
    opacity: 0.3,
    y: '30vh',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 0,
  },
};

function Modal({close, children}) {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      onClick={close}
      style={styles.backdrop}>
      <motion.div
        onClick={e => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={styles.container}>
        {children}
      </motion.div>
    </motion.div>
  );
}

const styles = {
  backdrop: {
    display: 'flex',
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  container: {
    margin: '0px',
    padding: '0em',
    display: 'flex',
    alignItems: 'center',
  },
};

export default Modal;
