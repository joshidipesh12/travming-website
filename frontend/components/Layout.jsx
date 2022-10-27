import React from 'react';
import Navbar from './Navbar';

function Layout({children}) {
  return (
    <>
      <Navbar />
      <div className="main">{children}</div>
      <style jsx>{`
        .main {
          height: 100%;
          width: 100vw;
        }
      `}</style>
    </>
  );
}

export default Layout;
