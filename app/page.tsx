"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import RandomJoke from "./components/RandomJoke";
import Joke from "./components/Joke";
import ModeratorLogin from "./components/ModeratorLogin";
import ModeratorDashboard from "./components/ModeratorDashborad";
import SignOutButton from "./components/SignOutButton";

export default function Home() {
  const [fetchASubmittedJokeId, setFetchASubmittedJokeId] = useState('');
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
  const [isJokeEditSuccess, setIsJokeEditSuccess] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);
  const [isDeletedSuccess, setIsDeletedSuccess] = useState(false);

  // fetch joke types
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_SUBMIT_SERVICE_PORT}/jokes/types`)
      .then(response => {
        setJokeTypes(response.data);
      })
      .catch(error => console.error('Error fetching joke types:', error));
  }, []);

  // fetch moderated (/approved) jokes by selected type
  const fetchModeratedJoke = async () => {
    if (type) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DELIVER_SERVICE_PORT}/jokes`, { params: { type } });
      setFetchAModeratedJoke(response.data.joke);
    } else {
      alert("Please fill the details");
    }
  }

  // fetch submitted (not moderated or not approved) jokes
  const fetchSubmittedJoke = async () => {
    if (type) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SUBMIT_SERVICE_PORT}/jokes`, { params: { type } });
      setFetchASubmittedJokeId(response.data._id);
      setFetchASubmittedJoke(response.data.joke);
      setFetchASubmittedJokeType(response.data.type);
    } else {
      alert("Please fill the details");
    }
  }

  // submit joke
  const submitJoke = async () => {
    setFetchASubmittedJoke('');
    if (joke && type) {
      await axios.post(`${process.env.NEXT_PUBLIC_SUBMIT_SERVICE_PORT}/jokes`, { content : {joke, type} });
      setJoke('');
      setType('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert("Please fill all details");
    }
  }

  // enable editing in moderating
  const handleEdit = () => {
    setIsEditing(true);
  };

  // send the selected submitted joke as approved to moderated database
  const handleApprove = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_PORT}/jokes/approve`, { content : { id: fetchASubmittedJokeId , joke: fetchASubmittedJoke, type: fetchASubmittedJokeType }});

      if(response.status == 201) {
        setFetchASubmittedJoke('');
        setIsApprovalSuccess(true);
        setTimeout(() => setIsApprovalSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error in Approval');
    }
  }

  // Delete Joke
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_PORT}/jokes/${fetchASubmittedJokeId}`);
      if(response) {
        setFetchASubmittedJoke('');
        setIsDeletedSuccess(true);
        setTimeout(() => setIsDeletedSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error in Deleting');
    }
  }

  // handle cancel the edit in moderated component
  const handleCancel = () => {
    setEditedJoke(fetchASubmittedJoke);
    setEditedJokeType(fetchASubmittedJokeType);
    setIsEditing(false);
  };

  // update the joke as moderated
  const handleSubmitModeratedJoke = async (e: any) => {
    e.preventDefault();
    if(!editedJoke || !editedJokeType) {
      alert("Please provide details");
      return;
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_PORT}/jokes/${fetchASubmittedJokeId}`, { content : { editedJoke, editedJokeType } });
      if(response.status == 201) {
        setIsEditing(false);
        setFetchASubmittedJoke('');
        setIsJokeEditSuccess(true)
        setTimeout(() => setIsJokeEditSuccess(false), 3000);
      }
    } catch (error) {
        console.error('Error updating the joke', error);
    }
  }

  // directing to Moderator Login
  const redirectToModerator = async () => {
    setIsModeratorLogin(true);
  }

  // handle states 
  const redirectToJokes = async () => {
    setEmail('');
    setPassword('');
    setIsModeratorLogin(false);
    setIsModeratorAccessSuccess(false);
  }

  // Login 
  const handleLogin = async (e : any) => {
    e.preventDefault();
    if (!email || !password) {
        alert("Please provide the details");
        return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_MODERATOR_SERVICE_PORT}/login`, {content : {email : email, password: password}})
      if(response.status == 200) {
         setIsModeratorAccessSuccess(true);
         setIsModeratorLogin(false);
      }
    } catch (error) {
      alert("Incorrect email and password")
      console.error('Error sign in: ', error);
    }
  }

  // signout
  const handleSignOut = () => {
    setIsModeratorAccessSuccess(false);
    setIsModeratorLogin(true);
  }

  return (
    <div style={{maxWidth: "700px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif"}}>
      <h1 style={{textAlign: "center", marginBottom: "20px", fontSize: "18px", color: "yellow"}}>
        Welcome to Joke App
      </h1>

      {(!isModeratorLogin && !IsModeratorAccessSuccess) && 
        <>
          <Joke
            joke={joke}
            setJoke={setJoke}
            type={type}
            setType={setType}
            jokeTypes={jokeTypes}
            submitJoke={submitJoke}
            submitted={submitted}
          />

          <RandomJoke
            type={type}
            setType={setType}
            jokeTypes={jokeTypes}
            fetchModeratedJoke={fetchModeratedJoke}
            fetchAModeratedJoke={fetchAModeratedJoke}
          />

          <div style={{marginTop: '40px'}}>
            <button onClick={redirectToModerator} style={{ backgroundColor: 'green', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', fontSize: '12px', marginBottom: '10px', marginRight: "20px"}}>
              <h1>SignIn as a Moderator !!</h1>
            </button>
          </div>
        </>
      }

      {isModeratorLogin && 
        <>
          <ModeratorLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            redirectToJokes={redirectToJokes}
          />
        </>
      }

      {IsModeratorAccessSuccess && 
        <>
          <ModeratorDashboard
            type={type}
            setType={setType}
            jokeTypes={jokeTypes}
            fetchSubmittedJoke={fetchSubmittedJoke}
            fetchASubmittedJoke={fetchASubmittedJoke}
            fetchASubmittedJokeType={fetchASubmittedJokeType}
            isEditing={isEditing}
            setEditedJoke={setEditedJoke}
            setEditedJokeType={setEditedJokeType}
            handleEdit={handleEdit}
            handleApprove={handleApprove}
            handleSubmitModeratedJoke={handleSubmitModeratedJoke}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            isJokeEditSuccess={isJokeEditSuccess}
            isApprovalSuccess={isApprovalSuccess}
            isDeletedSuccess={isDeletedSuccess}
            editedJoke={editedJoke}
            editedJokeType={editedJokeType}
          />

          <div style={{marginTop : '40px'}}>
            <SignOutButton handleSignOut={handleSignOut} />
          </div>
        </>
      }
    </div>
  );
}
