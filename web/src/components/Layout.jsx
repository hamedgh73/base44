import { Outlet } from 'react-router-dom';

import Footer from './Footer.jsx';
import Nav from './Nav.jsx';

export default function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Blueprint backdrop: fine grid + a soft accent bloom behind the page. */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="blueprint-grid absolute inset-0 opacity-[0.55]" />
        <div
          className="absolute -top-40 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #006fff 0%, transparent 68%)' }}
        />
      </div>

      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
