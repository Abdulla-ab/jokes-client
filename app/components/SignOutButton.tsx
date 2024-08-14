interface SignOutButtonProps {
    handleSignOut: () => void;
  }
  
  export default function SignOutButton({ handleSignOut }: SignOutButtonProps) {
    return (
      <button
        onClick={handleSignOut}
        style={{
          backgroundColor: '#f44336',
          border: 'none',
          padding: '8px',
          borderRadius: '3px',
          color: '#fff',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    );
  }
  