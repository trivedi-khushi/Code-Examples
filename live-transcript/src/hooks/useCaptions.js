import { useState, useRef } from "react";
import { useTranscription, Constants } from "@videosdk.live/react-sdk";

export function useCaptions() {
  const [captions, setCaptions] = useState([]);
  const [status, setStatus] = useState("stopped");
  const lastTypeRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const { startTranscription, stopTranscription } = useTranscription({
    onTranscriptionStateChanged: ({ status: s }) => {
      if (s === Constants.transcriptionEvents.TRANSCRIPTION_STARTING) setStatus("starting");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STARTED) setStatus("active");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STOPPING) setStatus("stopping");
      else if (s === Constants.transcriptionEvents.TRANSCRIPTION_STOPPED) setStatus("stopped");
    },
    onTranscriptionText: ({ participantName, text, timestamp, type }) => {
      const isInterim = type === "realtime";

      if (isInterim && timestamp === lastTimestampRef.current) {
        return;
      }

      lastTimestampRef.current = timestamp;

      setCaptions(prev => {
        const last = prev[prev.length - 1];

        if (last && lastTypeRef.current === "realtime" && isInterim) {
          const updated = [...prev];
          updated[updated.length - 1] = { participantName, text, timestamp };
          lastTypeRef.current = "realtime";
          return updated;
        }

        if (last && lastTypeRef.current === "realtime" && !isInterim) {
          const updated = [...prev];
          updated[updated.length - 1] = { participantName, text, timestamp };
          lastTypeRef.current = "fullSentence";
          return updated;
        }

        lastTypeRef.current = isInterim ? "realtime" : "fullSentence";
        return [...prev, { participantName, text, timestamp }].slice(-50);
      });
    },
  });

  return { captions, status, startTranscription, stopTranscription };
}