"use client";

import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [fetchASubmittedJoke, setFetchASubmittedJoke] = useState('');
  const [fetchAModeratedJoke, setFetchAModeratedJoke] = useState('');
  const [fetchASubmittedJokeType, setFetchASubmittedJokeType] = useState('');
  const [joke, setJoke] = useState('');
  const [type, setType] = useState('');
  const [jokeTypes, setJokeTypes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isModeratorLogin, setIsModeratorLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [IsModeratorAccessSuccess, setIsModeratorAccessSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJoke, setEditedJoke] = useState('');
  const [editedJokeType, setEditedJokeType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/jokes/types')
      .then(response => {
        setJokeTypes(response.data);
      })
      .catch(error => console.error('Error fetching joke types:', error));
  }, []);

  const fetchModeratedJoke = async () => {
    if (type) {
      const response = await axios.get('http://localhost:3002/jokes/joke', { params: { type } });
      setFetchAModeratedJoke(response.data.joke);
    } else {
      alert("Please fill the details");
    }
  }

  const fetchSubmittedJoke = async () => {
    if (type) {
      const response = await axios.get('http://localhost:3001/jokes/joke', { params: { type } });
      setFetchASubmittedJoke(response.data.joke);
      setFetchASubmittedJokeType(response.data.type);
    } else {
      alert("Please fill the details");
    }
  }

  const submitJoke = async () => {
    setFetchASubmittedJoke('');
    if (joke && type) {
      await axios.post('http://localhost:3001/jokes/submit', { content : {joke, type} });
      setJoke('');
      setType('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } else {
      alert("Please fill all details");
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedJoke(fetchASubmittedJoke);
    setEditedJokeType(fetchASubmittedJokeType);
    setIsEditing(false);
  };

  const redirectToModerator = async () => {
    setIsModeratorLogin(true);
  }

  const redirectToJokes = async () => {
    setEmail('');
    setPassword('');
    setIsModeratorLogin(false);
  }

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if (!email || !password) {
        alert("Please provide the details");
        return;
    }

    try {
      const response = await axios.post('http://localhost:3003/login', {content : {email : email, password: password}})
      if(response.status == 200) {
         setIsModeratorAccessSuccess(true);
         setIsModeratorLogin(false);
      }
    } catch (error) {
      console.error('Error sign in: ', error);
    }
  }

  return (
    <div style={{maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif"}}>
      <h1 style={{textAlign: "center", marginBottom: "20px", fontSize: "20px"}}>
        Welcome to Joke App
      </h1>

      {(!isModeratorLogin && !IsModeratorAccessSuccess) && 
        <>
          <div>
            <input
              value={joke}
              onChange={e => setJoke(e.target.value)} placeholder="Your joke"
              style={{ backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px', marginRight: "20px", width: "400px" }} />

            <select
              value={type}
              required={true}
              onChange={(e) => setType(e.target.value)}
              style={{ backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px', marginRight: "20px" }}
            >
              <option value="">Select joke type</option>
              {jokeTypes.map(jokeType => (
                <option key={jokeType} value={jokeType}>
                  {jokeType}
                </option>
              ))}
            </select>

            <button
              onClick={submitJoke}
              style={{ backgroundColor: '#24a0ed', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px' }}
            >
              Submit Joke
            </button>
            {submitted && <p style={{ color: '#28a745', fontWeight: "bold", textAlign: 'center' }}>Joke submitted!</p>}
          </div>
        
          <div style={{ marginBottom: '20px', marginTop: '40px' }}>
            <h2>Random Joke</h2>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px', marginRight: "20px" }}
            >
              <option value="">Select joke type</option>
              {jokeTypes.map(jokeType => (
                <option key={jokeType} value={jokeType}>
                  {jokeType}
                </option>
              ))}
            </select>

            <button
              onClick={fetchModeratedJoke}
              style={{ backgroundColor: '#28a745', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px' }}
            >
              Get A Random Joke
            </button>
            <p>{fetchAModeratedJoke}</p>
          </div>

          <div style={{marginTop: '40px'}}>
            <button onClick={redirectToModerator} style={{ backgroundColor: '#24a0ed', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '12px', marginBottom: '10px', marginRight: "20px"}}>
              <h1>Hey I am a Moderator !!</h1>
            </button>
          </div>
        </>
      }

      {isModeratorLogin && 
        <>
          <div>Please Sign In as a Moderator</div>

          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div style={{marginTop : '40px'}}>
            <button onClick={redirectToJokes} style={{ backgroundColor: '#24a0ed', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '12px', marginBottom: '10px', marginRight: "20px"}}>
              <h1>No, I want Jokes !!</h1>
            </button>
          </div>
        </>
      }

      {IsModeratorAccessSuccess && 
        <>
          <div style={{ marginBottom: '20px', marginTop: '40px' }}>
            <h2>Moderate Joke</h2>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ backgroundColor: '#f0f0f0', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px', marginRight: "20px" }}
            >
              <option value="">Select moderated joke type</option>
              {jokeTypes.map(jokeType => (
                <option key={jokeType} value={jokeType}>
                  {jokeType}
                </option>
              ))}
            </select>

            <button
              onClick={fetchSubmittedJoke}
              style={{ backgroundColor: '#28a745', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginBottom: '10px' }}
            >
              Get A Random Joke to Moderate
            </button>
            {fetchASubmittedJoke && 
              <>
                <div style={{marginTop : '15px', marginBottom: '20px'}}>
                  <p><strong>Joke : </strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedJoke}
                      onChange={(e) => setEditedJoke(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: 'black'}}
                    />
                  ) : (
                    <p style={{marginTop : '5px', marginBottom: '20px', font: 'bold'}}>{fetchASubmittedJoke}</p>
                  )}
                </div>
                <div>
                  <p><strong>Type : </strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedJokeType}
                      onChange={(e) => setEditedJokeType(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', color: 'black'}}
                    />
                  ) : (
                    <p style={{ marginTop: '5px' }}>{fetchASubmittedJokeType}</p>
                  )}
                </div>

                <div style={{ marginTop: '10px' }}>
              {isEditing ? (
                <>
                  <button
                    onClick={handleSubmit}
                    style={{ backgroundColor: '#007bff', color: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px', marginRight: '10px' }}
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{ backgroundColor: '#6c757d', color: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px' }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  style={{ backgroundColor: '#ffc107', color: '#333', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '16px' }}
                >
                  Edit
                </button>
              )}
            </div>
              </>
          }
        </div>
        </>
      }
    </div>
  );
}
