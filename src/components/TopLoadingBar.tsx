import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function TopLoadingBar() {
  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const { pathname } = useLocation();

  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Short pulse on every route change, so navigation is always acknowledged
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isBusy = isFetching || isMutating || isNavigating;

  useEffect(() => {
    if (isBusy) {
      setVisible(true);
      setProgress((current) => (current === 0 ? 10 : current));

      const interval = setInterval(() => {
        // Slows down as it approaches 90% and never completes on its own
        setProgress((current) => current + (90 - current) * 0.1);
      }, 200);

      return () => clearInterval(interval);
    }

    setProgress(100);
    const timer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);

    return () => clearTimeout(timer);
  }, [isBusy]);

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      aria-hidden={!visible}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="h-full bg-[#c73a0f] shadow-[0_0_8px_#c73a0f] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default TopLoadingBar;
