// Single source of truth for brand copy and navigation structure.
export const site = {
  name: 'Raven Protect',
  tagline: 'Enterprise-Grade Security. Intelligent Automation.',
  phone: '(555) 014-2280',
  email: 'projects@ravenprotect.com',
  // Drop an .mp4 loop in web/public/assets and point this at it to upgrade the
  // hero from the scroll-driven 3D render to a looping video background.
  heroVideo: null,
  heroPoster: '/assets/hero-isometric.jpg',
};

export const navLinks = [
  { label: 'UniFi Protect', to: '/unifi-protect' },
  { label: 'UniFi Access', to: '/unifi-access' },
  { label: 'Smart Automation', to: '/smart-home' },
  { label: 'Cabling & Network', to: '/cabling' },
  { label: 'Hardware', to: '/hardware' },
];

export const serviceOptions = [
  'Video Surveillance',
  'Access Control',
  'Smart Home Automation',
  'Network Cabling',
];

export const propertyTypes = [
  'Residential',
  'Enterprise / Commercial',
  'Multi-Site Portfolio',
  'New Construction',
];

export const ecosystem = [
  'Ubiquiti UniFi Protect',
  'UniFi Access',
  'UniFi Network',
  'Control4',
  'Josh.ai',
  'Apple HomeKit',
];
