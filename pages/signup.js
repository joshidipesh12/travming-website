import React, {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';
import {useToggle} from '@f/hooks';
import styles from '../styles/Signinup.module.css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {BsLinkedin, BsGoogle, BsFacebook} from 'react-icons/bs';
import {MdOutlineVisibilityOff, MdOutlineVisibility} from 'react-icons/md';
import {TextField, InputAdornment, withStyles} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {noError, signupUser} from '@f/store/login';
import {Spinner} from 'react-activity';
import 'react-activity/dist/library.css';
import {useSnackbar} from 'react-simple-snackbar';

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
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [display, setDisplay] = useState('none');
  const {token, signupLoading, error} = useSelector(state => state.login);

  useEffect(() => {
    const image = new Image();
    const url = `https://source.unsplash.com/${window.innerWidth}x${window.innerHeight}/?travelling`;
    image.addEventListener('load', e => {
      bgRef.current.style.backgroundImage = `url(${url})`;
      setDisplay('flex');
      return () => image.removeEventListener('load');
    });
    image.src = url;
  }, []);

  const handleSignup = () => {
    if (!name || !email || !password || !cpassword)
      showSnackBar('Please Fill all Details Properly!');
    else if (cpassword !== password)
      showSnackBar("Password Confirmation Doesn't Match!");
    else dispatch(signupUser({name, username: email, password}));
  };

  useEffect(() => {
    if (token?.length) router.replace('/');
  }, [token]);

  useEffect(() => {
    if (error?.length) {
      showSnackBar(error);
      dispatch(noError());
    }
  }, [error]);

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
            <div
              className={`${styles.boxContainer} ${styles.signup_container}`}>
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
                label="Name"
                type="text"
                size="small"
                variant="outlined"
                fullWidth={true}
                onChange={e => setName(e.target.value)}
              />
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
                    <InputAdornment style={{cursor: 'pointer'}} position="end">
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
              <CssTextField
                type={passwordVisible ? 'text' : 'password'}
                size="small"
                label="Confirm Password"
                variant="outlined"
                onChange={e => setCpassword(e.target.value)}
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment style={{cursor: 'pointer'}} position="end">
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
                  onClick={handleSignup}>
                  {signupLoading ? (
                    <Spinner color="#fff" size={10} />
                  ) : (
                    'SIGN UP'
                  )}
                </motion.button>
              </Link>
              <div className={styles.text}>
                Already have an account?{' '}
                <span style={{color: '#03a6a7'}}>
                  <Link href="/signin" passHref>
                    Sign In
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
