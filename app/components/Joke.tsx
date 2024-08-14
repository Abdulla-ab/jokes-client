interface JokeProps {
    joke: string;
    setJoke: (joke: string) => void;
    type: string;
    setType: (type: string) => void;
    jokeTypes: string[];
    submitJoke: () => void;
    submitted: boolean;
  }
  
  export default function Joke({
    joke, setJoke, type, setType, jokeTypes, submitJoke, submitted
  }: JokeProps) {
    return (
      <div style={{marginBottom: '20px'}}>
        <h2>Submit a Joke</h2>
        <form onSubmit={(e) => { e.preventDefault(); submitJoke(); }}>
          <div>
            <textarea
              value={joke}
              onChange={(e) => setJoke(e.target.value)}
              placeholder="Please enter your joke to laugh"
              rows={4}
              style={{width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black"}}
            />
          </div>
          <div style={{marginTop: '10px'}}>
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
          <button type="submit" style={{marginTop: '12px', backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px'}}>
            Submit Joke
          </button>
          {submitted && <p style={{color: 'green', marginTop: '12px'}}>Your Joke submitted successfully!</p>}
        </form>
      </div>
    );
  }
  