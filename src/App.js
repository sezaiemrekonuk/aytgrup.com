import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import { PageLoader } from './components/ui/LoadingSpinner';
import './i18n';

// ─── Code-split pages ─────────────────────────────────────────────────────────
// Each page is lazy-loaded so the initial bundle stays small.
const Home            = lazy(() => import('./pages/Home'));
const About           = lazy(() => import('./pages/Corporate/About'));
const Mission         = lazy(() => import('./pages/Corporate/Mission'));
const Certifications  = lazy(() => import('./pages/Corporate/Certifications'));
const Projects        = lazy(() => import('./pages/Projects'));
const ProjectDetail   = lazy(() => import('./pages/Projects/ProjectDetail'));
const Services        = lazy(() => import('./pages/Services'));
const Contact         = lazy(() => import('./pages/Contact'));
const NotFound        = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<Layout />}>
                {/* Home */}
                <Route index element={<Home />} />

                {/* Corporate */}
                <Route path="kurumsal">
                  <Route path="hakkimizda"  element={<About />} />
                  <Route path="misyon-vizyon" element={<Mission />} />
                  <Route path="belgelerimiz" element={<Certifications />} />
                </Route>

                {/* Projects */}
                <Route path="projelerimiz">
                  <Route index element={<Projects />} />
                  <Route path=":slug" element={<ProjectDetail />} />
                </Route>

                {/* Services */}
                <Route path="hizmetler" element={<Services />} />

                {/* Contact */}
                <Route path="iletisim" element={<Contact />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
