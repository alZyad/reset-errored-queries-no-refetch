import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHelloWorld } from "./api";
import FetchingIndicator from "./FetchingIndicator";

function InvalidateQueriesReproduction() {
  const queryClient = useQueryClient();

  const validityQuery = useQuery({
    queryKey: ["validity"],
    queryFn: fetchHelloWorld,
  });

  const validityQueryState = queryClient
    .getQueryCache()
    .find({ queryKey: ["validity"] })?.state;
  const isInvalidated = validityQueryState?.isInvalidated;

  const [validityResetKey, setValidityResetKey] = useState(0);
  const bumpValidity = () => setValidityResetKey((n) => n + 1);

  const invalidateAll = () => {
    bumpValidity();
    queryClient.invalidateQueries();
  };

  const invalidateByIsInvalidatedTrueField = () => {
    bumpValidity();
    queryClient.invalidateQueries({
      predicate: (q) => q.state.isInvalidated === true,
    });
  };

  const invalidateByIsInvalidatedFalseField = () => {
    bumpValidity();
    queryClient.invalidateQueries({
      predicate: (q) => q.state.isInvalidated === false,
    });
  };

  const invalidateByQueryKey = () => {
    bumpValidity();
    queryClient.invalidateQueries({ queryKey: ["validity"] });
  };

  return (
    <div>
      <section>
        <h2>Actions</h2>
        <button onClick={invalidateAll}>Invalidate all queries</button>
        <br />
        <pre>{`queryClient.invalidateQueries();`}</pre>
        <br />
        <button onClick={invalidateByIsInvalidatedTrueField}>
          Invalidate queries where isInvalidated === true
        </button>
        <br />
        <pre>
          {`queryClient.invalidateQueries({
  predicate: (q) => q.state.isInvalidated === true,
});`}
        </pre>
        <br />
        <button onClick={invalidateByIsInvalidatedFalseField}>
          Invalidate queries where isInvalidated === false
        </button>
        <br />
        <pre>
          {`queryClient.invalidateQueries({
  predicate: (q) => q.state.isInvalidated === false,
});`}
        </pre>
        <br />
        <button onClick={invalidateByQueryKey}>Invalidate query (validity) by query key</button>
        <pre>{`queryClient.invalidateQueries({ queryKey: ["validity"] });`}</pre>
      </section>

      <section>
        <h2>
          Validity Query
          <FetchingIndicator isFetching={validityQuery.isFetching} resetKey={validityResetKey} />
        </h2>
        <p>Status: {validityQuery.status}</p>
        <p>Data: {String(validityQuery.data)}</p>
        <p>Error: {validityQuery.error ? validityQuery.error.message : "none"}</p>
        <p>isInvalidated: {String(isInvalidated)}</p>
      </section>
    </div>
  );
}

export default InvalidateQueriesReproduction;
