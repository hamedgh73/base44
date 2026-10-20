import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Cabling from './pages/Cabling.jsx';
import Contact from './pages/Contact.jsx';
import Hardware from './pages/Hardware.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Portal from './pages/Portal.jsx';
import PortalConsole from './pages/PortalConsole.jsx';
import SmartHome from './pages/SmartHome.jsx';
import UniFiAccess from './pages/UniFiAccess.jsx';
import UniFiProtect from './pages/UniFiProtect.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/unifi-protect" element={<UniFiProtect />} />
          <Route path="/unifi-access" element={<UniFiAccess />} />
          <Route path="/smart-home" element={<SmartHome />} />
          <Route path="/cabling" element={<Cabling />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/console" element={<PortalConsole />} />
          <Route path="/portal/*" element={<Navigate to="/portal" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
