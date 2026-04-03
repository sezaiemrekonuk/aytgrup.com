import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrolled } from '../../hooks/useScrollTop';

export default function BackToTop() {
  const visible = useScrolled(400);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-20 right-4 z-40 w-10 h-10 bg-primary dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded shadow-nav flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-200 md:bottom-6 md:right-6 no-print"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
