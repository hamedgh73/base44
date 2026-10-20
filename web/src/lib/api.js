const BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? 'Something went wrong. Please try again.');
  }

  return payload;
}

export const api = {
  products: () => request('/products'),
  submitConsultation: (payload) =>
    request('/consultations', { method: 'POST', body: JSON.stringify(payload) }),
  portalLogin: (payload) =>
    request('/portal/login', { method: 'POST', body: JSON.stringify(payload) }),
  portalSystems: (token) =>
    request('/portal/systems', { headers: { Authorization: `Bearer ${token}` } }),
};
