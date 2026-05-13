import ResetQueriesReproduction from "./ResetQueriesReproduction";
import InvalidateQueriesReproduction from "./InvalidateQueriesReproduction";
import "./Home.css";

function Home() {
  return (
    <div className="home-columns">
      <div className="home-column">
        <h1>queryClient.resetQueries</h1>
        <ResetQueriesReproduction />
      </div>
      <div className="home-separator" />
      <div className="home-column">
        <h1>queryClient.invalidateQueries</h1>
        <InvalidateQueriesReproduction />
      </div>
    </div>
  );
}

export default Home;
