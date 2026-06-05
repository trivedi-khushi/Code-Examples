import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import CaptionsView from "./CaptionsView";

/**
 * MeetingView - Rendered inside MeetingProvider.
 * Waits for onMeetingJoined before showing the captions UI.
 */
export default function MeetingView() {
  const [joined, setJoined] = useState(false);

  const { meetingId } = useMeeting({
    onMeetingJoined: () => setJoined(true),
    onError: (error) => console.error("Meeting error:", error),
  });

  if (!joined) {
    return (
      <div className="join-screen">
        <p>Connecting to meeting...</p>
      </div>
    );
  }

  return (
    <div className="meeting-view">
      <header className="meeting-header">
        <h2>Meeting ID: {meetingId}</h2>
      </header>
      <CaptionsView />
    </div>
  );
}
