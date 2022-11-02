import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {useToggle} from '@f/hooks';
import styles from '../../styles/Signinup.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {BsLinkedin, BsGoogle, BsFacebook} from 'react-icons/bs';
import {MdOutlineVisibilityOff, MdOutlineVisibility} from 'react-icons/md';
import {TextField, InputAdornment, withStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, noError} from '@f/store/login';
import {Spinner} from 'react-activity';
import {useSnackbar} from 'react-simple-snackbar';
import 'react-activity/dist/library.css';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const [showSnackBar] = useSnackbar();
  const [passwordVisible, togglePassword] = useToggle(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('none');
  const {token, error, loginLoading} = useSelector(state => state.login);

  useEffect(() => {
    const image = new Image();
    const url = `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/?hotels`;
    image.addEventListener('load', e => {
      bgRef.current.style.backgroundImage = `url(${url})`;
      setDisplay('flex');
      return () => image.removeEventListener('load');
    });
    image.src = url;
  }, []);

  const handleLogin = () => {
    if (loginLoading) return;
    if (!email.length || !password.length)
      return showSnackBar('Please Fill Details Properly!');
    dispatch(loginUser({username: email, password}));
  };

  useEffect(() => {
    if (error?.length) {
      showSnackBar(error);
      dispatch(noError());
    }
  }, [error]);

  useEffect(() => {
    if (token?.length) router.replace('/');
  }, [token]);

  return (
    <main className={styles.main}>
      <form onSubmit={e => e.preventDefault()}>
        <motion.div
          ref={bgRef}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className={styles.container}
          style={{display}}>
          <div className={styles.backdrop}>
            <div className={styles.boxContainer}>
              <Link href="/" passHref>
                <div className={styles.logo}>
                  TRAV<span style={{color: '#03a6a7'}}>MING</span>
                </div>
              </Link>
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
                fullWidth={true}
                onChange={e => setEmail(e.target.value)}
              />
              <CssTextField
                type={passwordVisible ? 'text' : 'password'}
                size="small"
                label="Password"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{cursor: 'pointer'}}>
                      {!passwordVisible ? (
                        <MdOutlineVisibility
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          onMouseDown={e => e.preventDefault()}
                          color="white"
                        />
                      ) : (
                        <MdOutlineVisibilityOff
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                          onMouseDown={e => e.preventDefault()}
                          color="white"
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Link href="#" passHref>
                <motion.button
                  whileHover={{backgroundColor: '#037e7e', cursor: 'pointer'}}
                  whileTap={{scale: 0.95}}
                  className={styles.button}
                  onClick={handleLogin}>
                  {loginLoading ? (
                    <Spinner color="##fff" size={10} />
                  ) : (
                    'SIGN IN'
                  )}
                </motion.button>
              </Link>
              <div className={styles.text}>
                Dont have an account?{' '}
                <span style={{color: '#03a6a7'}}>
                  <Link href="/auth/signup" passHref>
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </form>
      {display === 'none' ? <Spinner color="#03a6a7" size={50} /> : null}
    </main>
  );
}

export default Signup;
