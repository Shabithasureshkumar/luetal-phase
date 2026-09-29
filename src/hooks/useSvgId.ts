import { useId } from 'react';

/** Unique id for SVG gradients. React's ids contain colons, which are unsafe inside `url(#…)`. */
export const useSvgId = () => useId().replace(/:/g, '');
