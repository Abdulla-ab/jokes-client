interface RandomJokeProps {
    type: string;
    setType: (type: string) => void;
    jokeTypes: string[];
    fetchModeratedJoke: () => void;
    fetchAModeratedJoke: string;
  }
  
  export default function RandomJoke({
    type, setType, jokeTypes, fetchModeratedJoke, fetchAModeratedJoke
  }: RandomJokeProps) {
    return (
      <div style={{marginBottom: '20px', marginTop: '40px'}}>
        <h2>Fetch a Random Joke</h2>
        <form onSubmit={(e) => { e.preventDefault(); fetchModeratedJoke(); }}>
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black"}}
            >
              <option value="">Select joke type</option>
              {jokeTypes.map((jokeType, index) => (
                <option key={index} value={jokeType}>{jokeType}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{marginTop: '10px', backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px'}}>
            Fetch Joke
          </button>
        </form>
        {fetchAModeratedJoke && <p style={{marginTop: '10px'}}>{fetchAModeratedJoke}</p>}
      </div>
    );
  }
  