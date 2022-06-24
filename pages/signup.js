import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {useToggle} from '../hooks';
import styles from '../styles/Signinup.module.css';
import Link from 'next/link';
import {BsLinkedin, BsGoogle, BsFacebook} from 'react-icons/bs';
import {MdOutlineVisibilityOff, MdOutlineVisibility} from 'react-icons/md';
import {
  TextField,
  IconButton,
  InputAdornment,
  withStyles,
} from '@material-ui/core';

const CssTextField = withStyles({
  root: {
    '& label': {
      color: '#d0d0d0',
      fontSize: 'small',
    },
    '& label.Mui-focused': {
      color: '#03a6a7',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#010001',
      color: '#ffffff',
      '&.Mui-focused fieldset': {
        borderColor: '#03a6a7',
      },
    },
  },
})(TextField);

function Signup({}) {
  const bgRef = useRef();
  const [passwordVisible, togglePassword] = useToggle(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    const image = new Image();
    const url = `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/?traveling`;
    image.addEventListener('load', e => {
      setDisplay('flex');
      bgRef.current.style.backgroundImage = `url(${url})`;
      return () => image.removeEventListener('load');
    });
    image.src = url;
  }, []);

  return (
    <main>
      <form onSubmit={e => e.preventDefault()}>
        <motion.div ref={bgRef} className={styles.container} style={{display}}>
          <div className={styles.backdrop}>
            <div className={styles.logo2}>
              TRAV<span style={{color: '#03a6a7'}}>MING</span>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.logo}>
                TRAV<span style={{color: '#03a6a7'}}>MING</span>
              </div>
              <div className={styles.alterIcons}>
                <BsGoogle
                  className={styles.alterIcon}
                  color="white"
                  size={30}
                />
                <BsFacebook
                  className={styles.alterIcon}
                  color="white"
                  size={30}
                />
                <BsLinkedin
                  className={styles.alterIcon}
                  color="white"
                  size={30}
                />
              </div>
              <div className={styles.text}>or use your email account</div>
              <CssTextField
                label="Email"
                type="email"
                size="small"
                variant="outlined"
                onChange={e => setEmail(e.target.value)}
              />
              <CssTextField
                type="password"
                size="small"
                label="Password"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    {!passwordVisible ? (
                      <MdOutlineVisibility
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                        onMouseDown={e => e.preventDefault()}
                      />
                    ) : (
                      <MdOutlineVisibilityOff
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                        onMouseDown={e => e.preventDefault()}
                      />
                    )}
                  </InputAdornment>
                }
              />
              <motion.button
                whileHover={{backgroundColor: '#037e7e'}}
                whileTap={{scale: 0.95}}
                className={styles.button}>
                SIGN UP
              </motion.button>
              <div className={styles.text}>
                Dont have a account?{' '}
                <span style={{color: '#03a6a7'}}>
                  <Link href="/signin">Sign In</Link>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </form>
    </main>
  );
}

export default Signup;
