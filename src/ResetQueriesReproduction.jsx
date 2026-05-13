import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHelloWorld, fetchError } from "./api";
import FetchingIndicator from "./FetchingIndicator";

function ResetQueriesReproduction() {
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
        <button onClick={resetAll}>Reset all queries (does refetch ✅)</button>
        <pre>{`queryClient.resetQueries();`}</pre>
        <button onClick={resetSuccessByStatus}>Reset all successful queries (does not refetch ❌)</button>
        <pre>
          {`queryClient.resetQueries({
  predicate: (q) => q.state.status === "success",
});`}
        </pre>
        <button onClick={resetErrorByStatus}>Reset all errored queries (does not refetch ❌)</button>
        <pre>
          {`queryClient.resetQueries({
  predicate: (q) => q.state.status === "error",
});`}
        </pre>
        <button onClick={resetSuccessByQueryKey}>Reset query 1 (success) (does refetch ✅)</button>
        <pre>{`queryClient.resetQueries({ queryKey: ["success"] });`}</pre>
        <button onClick={resetErrorByQueryKey}>Reset query 2 (error) (does refetch ✅)</button>
        <pre>{`queryClient.resetQueries({ queryKey: ["error"] });`}</pre>
      </section>

      <section>
        <h2>
          Success Query
          <FetchingIndicator isFetching={successQuery.isFetching} resetKey={successResetKey} />
        </h2>
        <p>Status: {successQuery.status}</p>
        <p>Data: {String(successQuery.data)}</p>
        <p>Error: {successQuery.error ? successQuery.error.message : "none"}</p>
      </section>

      <section>
        <h2>
          Error Query
          <FetchingIndicator isFetching={errorQuery.isFetching} resetKey={errorResetKey} />
        </h2>
        <p>Status: {errorQuery.status}</p>
        <p>Data: {String(errorQuery.data)}</p>
        <p>Error: {errorQuery.error ? errorQuery.error.message : "none"}</p>
      </section>
    </div>
  );
}

export default ResetQueriesReproduction;
