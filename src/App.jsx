import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import JoinScreen from "./components/JoinScreen";
import MeetingView from "./components/MeetingView";

/**
 * App - Top-level component for the VideoSDK Whiteboard demo.
 *
 * Holds meeting state and either renders the JoinScreen or wraps the
 * MeetingView in <MeetingProvider> (VideoSDK's React context provider).
 */
export default function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [joined, setJoined] = useState(false);

  // VideoSDK auth token — generated in the VideoSDK dashboard.
  const token = import.meta.env.VITE_VIDEOSDK_TOKEN;

  if (!joined || !meetingId) {
    return (
      <JoinScreen
        token={token}
        onJoin={(id) => {
          setMeetingId(id);
          setJoined(true);
        }}
      />
    );
  }

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Whiteboard User",
      }}
      token={token}
      joinWithoutUserInteraction={true}
    >
      <MeetingView />
    </MeetingProvider>
  );
}
