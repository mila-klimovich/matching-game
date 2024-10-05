import MatchingGame from './matchingGame';
import COUNTRIES_AND_CAPITALS from './countriesAndCapitals';

function App() {
  return (
      <div>
          <MatchingGame data={COUNTRIES_AND_CAPITALS} />
      </div>
  );
}

export default App;
