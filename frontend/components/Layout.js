/**
 * Main Layout Component
 * * This wraps the marketing pages (like the Home page).
 * It includes the Header and Footer.
 */
import React from 'react';
import Header from './home/Header';
import Footer from './home/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;