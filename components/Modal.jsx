import {motion} from 'framer-motion';
import React from 'react';

const dropIn = {
  hidden: {scale: 0},
  visible: {scale: 1},
  exit: {scale: 0},
};

function Modal({
  close,
  onExit,
  onClick,
  children,
  animVariants,
  backdropStyle,
}) {
  const variants = () => animVariants?.(dropIn) ?? dropIn;

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0, transition: {delay: 0.5}}}
      onClick={close}
      style={{...styles.backdrop, ...backdropStyle}}>
      <motion.div
        onClick={e => {
          onClick?.();
          e.stopPropagation();
        }}
        variants={variants()}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{duration: 0.4, easings: 'linear'}}
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
