import React from 'react';
import Navbar from './Navbar';

function Layout({children}) {
  return (
    <div>
      <Navbar />
      <main className="main">{children}</main>
      <style jsx>{`
        .main {
          height: 100%;
          width: 100vw;
        }
      `}</style>
    </div>
  );
}

export default Layout;
