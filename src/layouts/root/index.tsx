import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer/footer';

type Props = {
  children: React.ReactNode;
};

function GuestLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main id="body">{children}</main>
      <Footer />
    </>
  );
}

export default GuestLayout;
