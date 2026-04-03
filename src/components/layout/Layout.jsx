import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StickyContactBar from './StickyContactBar';
import BackToTop from '../ui/BackToTop';
import { useScrollTop } from '../../hooks/useScrollTop';

/**
 * Layout — wraps every page with Header, Footer, sticky bar, and back-to-top.
 * Uses React Router v6 <Outlet /> pattern for nested routes.
 * Also resets scroll position on route change via useScrollTop.
 */
export default function Layout() {
  useScrollTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* pb-14 on mobile to account for sticky contact bar height */}
      <main className="flex-1 pb-14 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyContactBar />
      <BackToTop />
    </div>
  );
}
