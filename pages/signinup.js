import React, {useState, useContext, createContext, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Head, Marginer} from '../components';
import styles from '../styles/Signinup.module.css';
import Link from 'next/link';

const AccountContext = createContext();

function Signinup({mode = 'signin'}) {
  const [wh, setWH] = useState(null);
  // const accountContext = useContext(AccountContext);
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState(mode);

  useEffect(() => {
    setWH(`${window.innerWidth}x${window.innerHeight}`);
    return () => {};
  }, []);

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signup');
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signin');
    }, 400);
  };

  const contextValue = {switchToSignup, switchToSignin};
  return (
    <AccountContext.Provider value={contextValue}>
      <main className={styles.main}>
        <Head />
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className={styles.container}
          style={{
            display: wh ? 'flex' : 'none',
            background: `center no-repeat cover url("https://source.unsplash.com/${wh}/?travel")`,
          }}>
          <div className={styles.boxContainer}>
            <div className={styles.topContainer}>
              <motion.div
                initial={false}
                variants={backdropVariants}
                className={styles.backdrop}
                animate={isExpanded ? 'expanded' : 'collapsed'}
                transition={expandingTransition}>
                {active === 'signin' && (
                  <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Welcome</div>
                    <div className={styles.headerText}>Back</div>
                    <div className={styles.smallText}>
                      Please sign-in to continue!
                    </div>
                  </div>
                )}
                {active === 'signup' && (
                  <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Create</div>
                    <div className={styles.headerText}>Account</div>
                    <div className={styles.smallText}>
                      Please sign-up to continue!
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
            <div className={styles.innerContainer}>
              {active === 'signin' && <LoginForm switchTo={switchToSignup} />}
              {active === 'signup' && <SignupForm switchTo={switchToSignin} />}
            </div>
          </div>
        </motion.div>
      </main>
    </AccountContext.Provider>
  );
}

const backdropVariants = {
  expanded: {
    width: '233%',
    height: '1050px',
    borderRadius: '20%',
    transform: 'rotate(60deg)',
  },
  collapsed: {
    width: '160%',
    height: '550px',
    borderRadius: '50%',
    transform: 'rotate(60deg)',
  },
};

const expandingTransition = {
  type: 'spring',
  duration: 2.3,
  stiffness: 30,
};

const LoginForm = ({switchTo}) => (
  <div className={styles.boxContainer}>
    <form className={styles.formContainer}>
      <input className={styles.input} type="email" placeholder="Email" />
      <input className={styles.input} type="password" placeholder="Password" />
    </form>
    <Marginer direction="vertical" margin={10} />
    <a className={styles.mutedLink}>
      <Link href="#">Forget your password?</Link>
    </a>
    <Marginer direction="vertical" margin="1.6em" />
    <button className={styles.submitButton} type="submit">
      Signin
    </button>
    <Marginer direction="vertical" margin="1em" />
    <div className={styles.mutedLink}>
      Don't have an accoun?{' '}
      <div className={styles.boldLink} onClick={switchTo}>
        <Link href="#">Signup</Link>
      </div>
    </div>
  </div>
);

const SignupForm = ({switchTo}) => <div></div>;

export default Signinup;
