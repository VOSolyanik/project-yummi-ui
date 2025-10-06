import { useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scrolling to top of an element when a dependency changes
 * @param {*} dependency - The value to watch for changes (e.g., currentPage)
 * @param {Object} options - Scroll options
 * @param {string} options.behavior - Scroll behavior ('smooth' or 'auto')
 * @param {string} options.block - Vertical alignment ('start', 'center', 'end', 'nearest')
 * @returns {Object} - Returns ref to attach to the element
 */
export const useScrollToTop = (dependency, options = {}) => {
  const elementRef = useRef(null);

  const {
    behavior = 'smooth',
    block = 'start'
  } = options;

  useEffect(() => {
    // Check if the element exists before attempting to scroll
    if (elementRef.current) {
      // Perform smooth scrolling to the top of the element
      elementRef.current.scrollIntoView({ behavior, block });
    }
  }, [dependency, elementRef, behavior, block]);

  return elementRef;
};

export default useScrollToTop;