// Device detection and optimization utilities for mobile

export const isMobileDevice = (): boolean => {
  return window.innerWidth <= 1024;
};

export const getScrollSmoothValues = () => {
  const width = window.innerWidth;
  if (width <= 768) {
    return { smooth: 0.8, speed: 1 }; // Faster/less smooth for mobile
  }
  if (width <= 1024) {
    return { smooth: 1.2, speed: 1.2 };
  }
  return { smooth: 1.5, speed: 1.5 };
};

export const disableCharacterAnimationsOnMobile = (): boolean => {
  // Disable complex character animations on low-end mobile devices
  if (!isMobileDevice()) return false;

  // Check for low memory devices
  const nav = navigator as any;
  if (nav.deviceMemory && nav.deviceMemory < 4) {
    return true;
  }

  // Check for low bandwidth
  if (
    nav.connection?.effectiveType === '4g' ||
    nav.connection?.effectiveType === '3g'
  ) {
    return true;
  }

  return false;
};

export const isLowEndDevice = (): boolean => {
  // Detect low-end devices based on available resources
  const nav = navigator as any;
  
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) {
    return true;
  }

  if (nav.connection?.saveData) {
    return true;
  }

  return false;
};
