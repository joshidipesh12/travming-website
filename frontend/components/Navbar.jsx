import React from 'react';
import {
  MdMenu,
  MdHome,
  MdLogin,
  MdLogout,
  MdOutlineExplore,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import {motion, useScroll, useTransform} from 'framer-motion';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {useToggle} from '../hooks';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../store/login';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Navbar() {
  const [drawer, toggleDrawer] = useToggle();
  const {user, token} = useSelector(state => state.login);

  const {scrollY: Y} = useScroll();
  const backgroundColor = useTransform(Y, [0, 100], ['#2f2f2f00', '#2f2f2fff']);
  const boxShadow = useTransform(
    Y,
    [80, 150],
    ['0 0 0px #000', '0 0 5px #000'],
  );

  return (
    <motion.header
      style={{
        backgroundColor,
        boxShadow,
        padding: '1% 1rem 1% 1.5rem',
        width: '100%',
        top: 0,
        position: 'fixed',
        display: 'flex',
        zIndex: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Link href="/">
        <motion.div
          whileHover={{cursor: 'pointer'}}
          style={{
            fontFamily: "'Chillax', sans-serif",
            color: 'white',
            fontSize: 'large',
            position: 'relative',
          }}>
          <span style={{color: '#12CE31'}}>Trav</span>Ming
        </motion.div>
      </Link>
      <IconButton onClick={toggleDrawer} aria-label="menu">
        <MdMenu color="white" size={20} />
      </IconButton>
      <Drawer
        SlideProps={{
          style: {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
        anchor="right"
        open={drawer}
        onClose={toggleDrawer}>
        <DrawerContent toggle={toggleDrawer} />
      </Drawer>
    </motion.header>
  );
}

const DrawerContent = ({toggle}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {token, user} = useSelector(state => state.login);

  const route = url => {
    router.push(url);
  };

  return (
    <div className="container" role="presentation" onClick={toggle}>
      <List>
        <ListItem onMouseDown={() => route('/')} button>
          <MdHome />
          <ListItemText inset primary="Home" />
        </ListItem>
        <ListItem onMouseDown={() => route('/explore')} button>
          <MdOutlineExplore />
          <ListItemText inset primary="Explore" />
        </ListItem>
        {token?.length ? (
          <>
            <ListItem onMouseDown={() => route('/profile')} button>
              <MdOutlineAccountCircle />
              <ListItemText
                inset
                primary={(user?.name
                  ? user.name
                  : user.username.split('@')[0]
                ).toUpperCase()}
              />
            </ListItem>
            <ListItem
              button
              onMouseDown={() => {
                window.location.reload();
                dispatch(logout());
              }}>
              <MdLogout />
              <ListItemText inset primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onMouseDown={() => route('/signin')} button>
              <MdLogin />
              <ListItemText inset primary="Sign In" />
            </ListItem>
            <ListItem onMouseDown={() => route('/signup')} button>
              <MdOutlineAccountCircle />
              <ListItemText inset primary="Sign Up" />
            </ListItem>
          </>
        )}
        <ListItem
          onMouseDown={() => {
            route('https://joshidipesh12.github.io');
          }}
          button>
          <AiFillLinkedin />
          <ListItemText inset primary="Contact Developer" />
        </ListItem>
        <ListItem
          onMouseDown={() => {
            route('https://github.com/joshidipesh12/travming-website');
          }}
          button>
          <AiFillGithub />
          <ListItemText inset primary="View Source" />
        </ListItem>
        {/* <Image
          src="/giphy.gif"
          objectFit="contain"
          layout="responsive"
          height="70vh"
          width="100%"
          alt="yoda"
          priority={true}
        /> */}
      </List>
      <style jsx>{`
        .container {
          width: 250px;
          font-size: 1.5em;
          color: white;
          margin-top: 3rem;
        }
        @media (max-aspect-ratio: 1/1) {
          .container {
            width: 80vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
