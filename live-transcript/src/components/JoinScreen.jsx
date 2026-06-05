import { useState } from "react";
import { createMeeting } from "../api";

/**
 * JoinScreen - Entry screen with a single button to create + join a meeting.
 */
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
      <h1>VideoSDK Live Captions Demo</h1>
      <p>Join a meeting and speak — your words will appear as live captions.</p>
      <button className="primary-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Creating meeting..." : "Create & Join Meeting"}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
