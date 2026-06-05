import { useState } from "react";
import { createMeeting } from "../api";

export default function JoinScreen({ token, onJoin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const roomId = await createMeeting({ token });
      onJoin(roomId);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="join-screen">
      <h1>VideoSDK Whiteboard Demo</h1>
      <p>Click below to create a new meeting and try the whiteboard.</p>
      <button className="primary-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Creating meeting..." : "Create & Join Meeting"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
