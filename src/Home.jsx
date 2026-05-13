import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHelloWorld, fetchError } from "./api";
import "./Home.css";

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

  const resetSuccessByStatus = () => {
    bumpSuccess();
    queryClient.resetQueries({
      predicate: (q) => q.state.status === "success",
    });
  };

  const resetErrorByStatus = () => {
    bumpError();
    queryClient.resetQueries({
      predicate: (q) => q.state.status === "error",
    });
  };

  const resetSuccessByQueryKey = () => {
    bumpSuccess();
    queryClient.resetQueries({ queryKey: ["success"] });
  };

  const resetErrorByQueryKey = () => {
    bumpError();
    queryClient.resetQueries({ queryKey: ["error"] });
  };

  return (
    <div>
      <section>
        <h2>Actions</h2>
        <button onClick={resetAll}>Reset all queries (does refetch ✅)</button>
        <br />
        <pre>{`queryClient.resetQueries();`}</pre>
        <br />
        <button onClick={resetSuccessByStatus}>Reset all successful queries (does not refetch ❌)</button>
        <br />
        <pre>
          {`queryClient.resetQueries({
  predicate: (q) => q.state.status === "success",
});`}
        </pre>
        <br />
        <button onClick={resetErrorByStatus}>Reset all errored queries (does not refetch ❌)</button>
        <br />
        <pre>
          {`queryClient.resetQueries({
  predicate: (q) => q.state.status === "error",
});`}
        </pre>
        <br />
        <button onClick={resetSuccessByQueryKey}>Reset query 1 (success) (does refetch ✅)</button>
        <br />
        <pre>{`queryClient.resetQueries({ queryKey: ["success"] });`}</pre>
        <br />
        <button onClick={resetErrorByQueryKey}>Reset query 2 (error) (does refetch ✅)</button>
        <pre>{`queryClient.resetQueries({ queryKey: ["error"] });`}</pre>
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
