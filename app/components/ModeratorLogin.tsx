interface ModeratorLoginProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: (e: any) => void;
    redirectToJokes: () => void;
  }
  
  export default function ModeratorLogin({
    email, setEmail, password, setPassword, handleLogin, redirectToJokes
  }: ModeratorLoginProps) {
    return (
      <div style={{marginBottom: '20px'}}>
        <h2>Moderator Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black"}}
            />
          </div>
          <div style={{marginTop: '10px'}}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
              style={{width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black"}}
            />
          </div>
          <button type="submit" style={{marginTop: '10px', backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginRight: '20px'}}>
            SignIn
          </button>
          <button type="button" onClick={redirectToJokes} style={{marginTop: '10px', backgroundColor: 'green', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px'}}>
            Back to Jokes
          </button>
        </form>
      </div>
    );
  }
  