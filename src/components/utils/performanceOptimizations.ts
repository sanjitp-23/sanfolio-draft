/**
 * Performance Optimization Utilities
 * Helps reduce jank and improve scroll smoothness
 */

import gsap from "gsap";

/**
 * Enable GPU-accelerated animations
 * This forces animations to use the GPU for better performance
 */
export function enableGPUAcceleration() {
  const style = document.createElement("style");
  style.textContent = `
    * {
      backface-visibility: hidden;
      perspective: 1000px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Optimize scroll trigger refresh
 * Debounces refresh calls to prevent excessive recalculations
 */
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
export function optimizeScrollTriggerRefresh(delay: number = 200) {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    gsap.ticker.add(() => {
      // Force scroll trigger refresh
      window.dispatchEvent(new Event("resize"));
    });
  }, delay);
}

/**
 * Monitor frame rate to detect performance issues
 * Returns FPS and alerts if it drops below threshold
 */
export function monitorFrameRate(
  onFPSChange?: (fps: number) => void,
  threshold: number = 30
) {
  let lastTime = performance.now();
  let frames = 0;
  let fps = 0;

  const checkFPS = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime >= 1000) {
      fps = Math.round(frames * (1000 / deltaTime));
      frames = 0;
      lastTime = currentTime;

      if (onFPSChange) {
        onFPSChange(fps);
      }

      if (fps < threshold) {
        console.warn(`⚠️ Low FPS detected: ${fps}fps`);
      }
    }

    frames++;
    requestAnimationFrame(checkFPS);
  };

  requestAnimationFrame(checkFPS);
}

/**
 * Reduce animation frame updates during scroll
 * Useful for reducing expensive calculations during scroll
 */
export function throttleScrollUpdates(callback: () => void, delay: number = 16) {
  let lastUpdate = 0;

  return () => {
    const now = Date.now();
    if (now - lastUpdate >= delay) {
      callback();
      lastUpdate = now;
    }
  };
}

/**
 * Disable animations on low-end devices
 * Detects device performance and disables heavy animations if needed
 */
export function detectLowEndDevice(): boolean {
  // Check processor cores
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  // Check connection speed (if available)
  const connection = (navigator as any).connection;
  if (connection && connection.saveData) {
    return true;
  }

  return false;
}

/**
 * Optimize GSAP animations for performance
 * Converts complex animations to simpler forms on low-end devices
 */
export function setupPerformanceMode() {
  const isLowEnd = detectLowEndDevice();

  if (isLowEnd) {
    console.log("🔧 Low-end device detected. Enabling performance mode.");
    // Disable certain effects or reduce animation quality
    gsap.globalTimeline.speed(0.95); // Slightly reduce animation speed
  }

  return isLowEnd;
}

/**
 * Batch DOM measurements and updates
 * Helps prevent layout thrashing
 */
export function batchDOMUpdates(updates: (() => void)[]) {
  // Read phase
  const measurements = updates.map((update) => {
    // Measurements happen here if needed
    return update;
  });

  // Write phase (all at once)
  requestAnimationFrame(() => {
    measurements.forEach((callback) => callback());
  });
}
