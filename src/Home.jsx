import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHelloWorld, fetchError } from "./api";
import "./Home.css";

function PendingIndicator({ isPending, resetKey }) {
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (!isPending) return;
    setSecondsLeft(3);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSecondsLeft(Math.max(0, 3 - elapsed));
    }, 200);
    return () => clearInterval(id);
  }, [isPending, resetKey]);

  if (!isPending) return <span className="pending-indicator">🏁</span>;

  return (
    <span className="pending-indicator">
      <span className="spinner" aria-label="loading" />
      {secondsLeft > 0 ? <span className="countdown">{secondsLeft}s</span> : <span className="stuck">♾️ stuck</span>}
    </span>
  );
}

function Home() {
  const queryClient = useQueryClient();

  const successQuery = useQuery({
    queryKey: ["success"],
    queryFn: fetchHelloWorld,
  });

  const errorQuery = useQuery({
    queryKey: ["error"],
    queryFn: fetchError,
  });

  const [successResetKey, setSuccessResetKey] = useState(0);
  const [errorResetKey, setErrorResetKey] = useState(0);
  const bumpSuccess = () => setSuccessResetKey((n) => n + 1);
  const bumpError = () => setErrorResetKey((n) => n + 1);

  const resetAll = () => {
    bumpSuccess();
    bumpError();
    queryClient.resetQueries();
  };

  const resetSuccessful = () => {
    if (successQuery.status === "success") bumpSuccess();
    if (errorQuery.status === "success") bumpError();
    queryClient.resetQueries({
      predicate: (q) => q.state.status === "success",
    });
  };

  const resetErrored = () => {
    if (successQuery.status === "error") bumpSuccess();
    if (errorQuery.status === "error") bumpError();
    queryClient.resetQueries({
      predicate: (q) => q.state.status === "error",
    });
  };

  const resetSuccess = () => {
    bumpSuccess();
    queryClient.resetQueries({ queryKey: ["success"] });
  };

  const resetError = () => {
    bumpError();
    queryClient.resetQueries({ queryKey: ["error"] });
  };

  return (
    <div>
      <h1>Home</h1>

      <section>
        <h2>Actions</h2>
        <button onClick={resetAll}>Reset all queries</button>
        <button onClick={resetSuccessful}>Reset all successful queries</button>
        <button onClick={resetErrored}>Reset all errored queries</button>
        <button onClick={resetSuccess}>Reset query 1 (success)</button>
        <button onClick={resetError}>Reset query 2 (error)</button>
      </section>

      <section>
        <h2>
          Success Query
          <PendingIndicator isPending={successQuery.isPending} resetKey={successResetKey} />
        </h2>
        <p>Status: {successQuery.status}</p>
        <p>Data: {String(successQuery.data)}</p>
        <p>Error: {successQuery.error ? successQuery.error.message : "none"}</p>
      </section>

      <section>
        <h2>
          Error Query
          <PendingIndicator isPending={errorQuery.isPending} resetKey={errorResetKey} />
        </h2>
        <p>Status: {errorQuery.status}</p>
        <p>Data: {String(errorQuery.data)}</p>
        <p>Error: {errorQuery.error ? errorQuery.error.message : "none"}</p>
      </section>
    </div>
  );
}

export default Home;
