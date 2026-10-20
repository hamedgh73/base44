/** Tiny class-name joiner — keeps conditional Tailwind strings readable. */
export function cn(...values) {
  return values.filter(Boolean).join(' ');
}
