import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function TopLoadingBar() {
  const isFetching = useIsFetching() > 0;
  const isMutating = useIsMutating() > 0;
  const isBusy = isFetching || isMutating;

  const [progress, setProgress] = useState(0);
  const [prevBusy, setPrevBusy] = useState(false);

  // Adjusted during render (not in an effect) when the busy state flips
  if (isBusy !== prevBusy) {
    setPrevBusy(isBusy);
    setProgress(isBusy ? 10 : 100);
  }

  useEffect(() => {
    if (isBusy) {
      const interval = setInterval(() => {
        // Slows down as it approaches 90% and never completes on its own
        setProgress((current) => current + (90 - current) * 0.1);
      }, 200);

      return () => clearInterval(interval);
    }

    const timer = setTimeout(() => setProgress(0), 300);
    return () => clearTimeout(timer);
  }, [isBusy]);

  const visible = progress > 0;

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
