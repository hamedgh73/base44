const KEY = 'raven.console.session';

export const session = {
  read() {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  write(value) {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  },
  clear() {
    window.localStorage.removeItem(KEY);
  },
};
