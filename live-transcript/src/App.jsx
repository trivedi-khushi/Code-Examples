import { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import JoinScreen from "./components/JoinScreen";
import MeetingView from "./components/MeetingView";

/**
 * App - Root component for the VideoSDK Live Captions demo.
 */
export default function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [joined, setJoined] = useState(false);
  const token = import.meta.env.VITE_VIDEOSDK_TOKEN;

  if (!joined || !meetingId) {
    return (
      <JoinScreen
        token={token}
        onJoin={(id) => { setMeetingId(id); setJoined(true); }}
      />
    );
  }

  return (
    <MeetingProvider
      config={{ meetingId, micEnabled: true, webcamEnabled: false, name: "Captions User" }}
      token={token}
      joinWithoutUserInteraction={true}
    >
      <MeetingView />
    </MeetingProvider>
  );
}
