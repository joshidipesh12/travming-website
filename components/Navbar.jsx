import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import {
  MdMenu,
  MdHome,
  MdLogin,
  MdLogout,
  MdOutlineExplore,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import {motion} from 'framer-motion';
import {Divider, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {useToggle} from '../hooks';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../store/login';
import Image from 'next/image';

function Navbar() {
  const [drawer, toggleDrawer] = useToggle();
  const {username, loggedIn} = useSelector(state => state.login);

  return (
    <header className={styles.container}>
      <section className={`${styles.links} ${styles.hide}`}>
        {loggedIn && username ? (
          <div style={{textTransform: 'uppercase'}} className={styles.link}>
            {username}
          </div>
        ) : (
          <>
            <div className={styles.link}>
              <Link passHref href="/signup">
                Sign Up
              </Link>
            </div>
            <div className={styles.link}>
              <Link passHref href="/signin">
                Sign In
              </Link>
            </div>
          </>
        )}
      </section>
      <Link passHref href="/">
        <motion.div className={styles.name}>
          TRAV<span style={{color: '#03a6a7'}}>MING</span>
        </motion.div>
      </Link>
      <section className={styles.links}>
        <div className={`${styles.link} ${styles.hide}`}>
          <Link passHref href="/explore">
            Explore
          </Link>
        </div>
        <div className={styles.link}>
          <MdMenu
            className={styles.searchIcon}
            onClick={toggleDrawer}
            size={20}
          />
        </div>
      </section>
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
        <DrawerContent anchor={drawer} toggle={toggleDrawer} />
      </Drawer>
    </header>
  );
}

const DrawerContent = ({anchor, toggle}) => {
  const dispatch = useDispatch();
  const {loggedIn, username} = useSelector(state => state.login);

  return (
    <div role="presentation" onClick={toggle} style={{width: 250}}>
      <List>
        <ListItem>
          <Link passHref href="/">
            <ListItemText
              primaryTypographyProps={{
                style: {
                  color: 'rgb(3, 166, 167)',
                  fontFamily: 'Carter One',
                  textAlign: 'center',
                  fontSize: 'large',
                },
              }}
              primary="TRAVMING"
            />
          </Link>
        </ListItem>
        <ListItem button>
          <MdHome />
          <Link href="/" passHref>
            <ListItemText inset primary="Home" />
          </Link>
        </ListItem>
        <ListItem button>
          <MdOutlineExplore />
          <Link href="/explore" passHref>
            <ListItemText inset primary="Explore" />
          </Link>
        </ListItem>
        <Divider />
        {loggedIn ? (
          <>
            <ListItem button>
              <MdOutlineAccountCircle />
              <ListItemText
                inset
                primary={username.split('@')[0].toUpperCase()}
              />
            </ListItem>
            <ListItem button onClick={() => dispatch(logout())}>
              <MdLogout />
              <Link href="/" replace passHref shallow>
                <ListItemText inset primary="Logout" />
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button>
              <MdLogin />
              <Link href="/signin" passHref>
                <ListItemText inset primary="Sign In" />
              </Link>
            </ListItem>
            <ListItem button>
              <MdOutlineAccountCircle />
              <Link href="/signup" passHref>
                <ListItemText inset primary="Sign Up" />
              </Link>
            </ListItem>
          </>
        )}
        <Divider />
        <ListItem button>
          <AiFillLinkedin />
          <Link href="https://linkedin.com/in/joshidipesh12" passHref>
            <ListItemText inset primary="Contact" />
          </Link>
        </ListItem>
        <ListItem button>
          <AiFillGithub />
          <Link
            href="https://github.com/joshidipesh12/travming-website"
            passHref>
            <ListItemText inset primary="About" />
          </Link>
        </ListItem>
        <Image
          src="/giphy.gif"
          objectFit="contain"
          layout="responsive"
          height="70vh"
          width="100%"
          alt="yoda"
        />
      </List>
    </div>
  );
};

export default Navbar;
