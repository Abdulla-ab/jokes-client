import React from 'react';

interface ModeratorDashboardProps {
  type: string;
  setType: (type: string) => void;
  jokeTypes: string[];
  fetchSubmittedJoke: () => void;
  fetchASubmittedJoke: string;
  fetchASubmittedJokeType: string;
  isEditing: boolean;
  setEditedJoke: (joke: string) => void;
  setEditedJokeType: (type: string) => void;
  handleEdit: () => void;
  handleApprove: () => void;
  handleSubmitModeratedJoke: (e: React.FormEvent) => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isJokeEditSuccess: boolean;
  isApprovalSuccess: boolean;
  isDeletedSuccess: boolean;
  editedJoke: string;
  editedJokeType: string;
}

export default function ModeratorDashboard({
  type, setType, jokeTypes, fetchSubmittedJoke, fetchASubmittedJoke, isEditing, setEditedJoke, setEditedJokeType, handleEdit, handleApprove, handleSubmitModeratedJoke, handleCancel, isJokeEditSuccess, isApprovalSuccess, isDeletedSuccess, handleDelete, editedJoke, editedJokeType
}: ModeratorDashboardProps) {

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Moderator Dashboard</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchSubmittedJoke(); }}>
        <div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black" }}
          >
            <option value="">Select joke type</option>
            {jokeTypes.map((jokeType, index) => (
              <option key={index} value={jokeType}>{jokeType}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{ marginTop: '10px', backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginBottom: '30px' }}
        >
          Fetch Submitted Joke
        </button>
      </form>

      {fetchASubmittedJoke && 
        <p style={{ marginBottom: '20px', marginTop: '10px' }}>Joke: {fetchASubmittedJoke}</p>
      }

      {fetchASubmittedJoke && !isEditing &&
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleEdit}
            style={{ backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginRight: '20px' }}
          >
            Edit Joke
          </button>
          <button
            onClick={handleApprove}
            style={{ backgroundColor: 'orange', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginLeft: '10px' }}
          >
            Approve Joke
          </button>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: 'red', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginLeft: '10px' }}
          >
            Delete Joke
          </button>
        </div>
      }

      {isEditing &&
        <>
            <textarea
              value={editedJoke}
              onChange={(e) => setEditedJoke(e.target.value)}
              placeholder="edit the joke here"
              rows={4}
              style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black" }}
            />

            <input
              type="text"
              value={editedJokeType}
              placeholder="edit the joke type here"
              onChange={(e) => setEditedJokeType(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #ccc", color: "black" , marginTop: '10px'}}
            />

            <button
                onClick={handleSubmitModeratedJoke}
                style={{ marginTop: '10px', backgroundColor: '#24a0ed', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px', marginRight: '20px' }}
            >
                Submit Moderated Joke
            </button>
            <button
                onClick={handleCancel}
                style={{ marginTop: '10px', backgroundColor: '#f44336', border: 'none', padding: '8px', borderRadius: '3px', color: '#fff', fontSize: '14px' }}
            >
                Cancel
            </button>
        </>
      }
      {isJokeEditSuccess && <p style={{ color: 'green', marginTop: '10px' }}>Joke edited successfully!</p>}
      {isApprovalSuccess && !isEditing && <p style={{ color: 'orange', marginTop: '10px' }}>Joke approved successfully!</p>}
      {isDeletedSuccess && !isEditing && <p style={{ color: 'red', marginTop: '10px' }}>Joke deleted successfully!</p>}
    </div>
  );
}
