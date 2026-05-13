import { useEffect, useState } from "react";

function FetchingIndicator({ isFetching, resetKey }) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (!isFetching) return;
    setSecondsLeft(3);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSecondsLeft(Math.max(0, 3 - elapsed));
    }, 200);
    return () => clearInterval(id);
  }, [isFetching, resetKey]);

  if (!isFetching) return <span className="pending-indicator">🏁</span>;

  return (
    <span className="pending-indicator">
      <span className="spinner" aria-label="loading" />
      {secondsLeft > 0 ? <span className="countdown">{secondsLeft}s</span> : <span className="stuck">♾️ stuck</span>}
    </span>
  );
}

export default FetchingIndicator;
