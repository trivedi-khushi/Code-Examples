import { useState } from "react";
import { useTranscription, Constants } from "@videosdk.live/react-sdk";

export function useCaptions() {
  const [captions, setCaptions] = useState([]);
  const [status, setStatus] = useState("stopped");

  const { startTranscription, stopTranscription } = useTranscription({
    onTranscriptionStateChanged: ({ status: s }) => {
      if (s === Constants.transcriptionEvents.TRANSCRIPTION_STARTING) setStatus("starting");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STARTED) setStatus("active");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STOPPING) setStatus("stopping");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STOPPED) setStatus("stopped");
    },
    onTranscriptionText: ({ participantName, text, timestamp, type }) => {
      // Log everything so we can see what `type` value VideoSDK actually sends
      console.log("transcription event →", { participantName, text, type, timestamp });
      setCaptions(prev => {
        const updated = [...prev, { participantName, text, timestamp }];
        return updated.slice(-50);
      });
    },
  });

  return { captions, status, startTranscription, stopTranscription };
}
