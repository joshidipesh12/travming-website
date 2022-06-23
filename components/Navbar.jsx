import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';
import {MdMenu} from 'react-icons/md';
import {motion} from 'framer-motion';
import {Divider, Drawer, List, ListItem, ListItemText} from '@material-ui/core';
import {useToggle} from '../hooks';

function Navbar() {
  const [drawer, toggleDrawer] = useToggle();

  return (
    <header className={styles.container}>
      <section className={`${styles.links} ${styles.hide}`}>
        <div className={styles.link}>Sign Up / Sign In</div>
      </section>
      <motion.div className={styles.name}>
        <Link href="/">TRAVMING</Link>
      </motion.div>
      <section className={styles.links}>
        <div className={`${styles.link} ${styles.hide}`}>
          <Link href="/explore">Explore</Link>
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
  return (
    <div role="presentation" onClick={toggle} style={{width: 250}}>
      <List>
        <ListItem>
          <ListItemText
            style={{
              color: 'white',
              fontWeight: 800,
              fontFamily: 'sans-serif',
              textAlign: 'center',
              textShadow: '0 0 4px grey',
            }}
            primary="TRAVMING"
          />
        </ListItem>
        <ListItem button>
          <Link href="/" passHref>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="/explore" passHref>
            <ListItemText primary="Explore" />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Sign Up" />
        </ListItem>
        <Divider />
        <ListItem button>
          <Link href="https://linkedin.com/in/joshidipesh12" passHref>
            <ListItemText primary="Contact" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link href="https://joshidipesh12.github.io" passHref>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default Navbar;
