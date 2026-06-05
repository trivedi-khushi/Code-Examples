cat > src/components/MeetingView.jsx << 'EOF'
import { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import WhiteboardView from "./WhiteboardView";

export default function MeetingView() {
  const [joined, setJoined] = useState(false);

  const { meetingId } = useMeeting({
    onMeetingJoined: () => {
      console.log("Meeting joined!");
      setJoined(true);
    },
    onError: (error) => {
      console.error("Meeting error:", error);
    },
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
      <WhiteboardView />
    </div>
  );
}
EOF