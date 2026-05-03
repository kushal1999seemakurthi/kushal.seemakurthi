import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export interface ScrollProgress {
  globalProgress: number;
  sectionProgress: number;
  currentSection: number;
}

let globalLenisInstance: Lenis | null = null;
let listeners: Set<(progress: ScrollProgress) => void> = new Set();

// Register the global Lenis instance
export function registerLenisInstance(lenis: Lenis) {
  globalLenisInstance = lenis;
}

// Subscribe to scroll progress updates
function subscribeToScrollProgress(callback: (progress: ScrollProgress) => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Broadcast scroll progress to all subscribers
export function broadcastScrollProgress() {
  if (!globalLenisInstance) return;

  const sections = document.querySelectorAll('section[id^="section-"]');
  if (sections.length === 0) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const globalProgress = totalHeight > 0 ? scrollTop / totalHeight : 0;

  let currentSection = 0;
  let sectionProgress = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i] as HTMLElement;
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
      currentSection = i;
      const sectionHeight = section.offsetHeight;
      sectionProgress = sectionHeight > 0 ? (scrollTop - sectionTop) / sectionHeight : 0;
      break;
    }
  }

  const progress: ScrollProgress = {
    globalProgress: Math.max(0, Math.min(1, globalProgress)),
    sectionProgress: Math.max(0, Math.min(1, sectionProgress)),
    currentSection,
  };

  listeners.forEach(listener => listener(progress));
}

export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    globalProgress: 0,
    sectionProgress: 0,
    currentSection: 0,
  });

  useEffect(() => {
    const unsubscribe = subscribeToScrollProgress(setProgress);

    // Trigger initial calculation
    broadcastScrollProgress();

    return unsubscribe;
  }, []);

  return progress;
}
