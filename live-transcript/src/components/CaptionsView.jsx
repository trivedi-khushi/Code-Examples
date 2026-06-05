import { useEffect, useRef } from "react";
import { useCaptions } from "../hooks/useCaptions";

/**
 * CaptionsView - UI for starting/stopping captions and displaying caption lines.
 * Uses useCaptions() hook which wraps VideoSDK's useTranscription.
 */
export default function CaptionsView() {
  const { captions, status, startTranscription, stopTranscription } = useCaptions();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new captions arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [captions]);

  const badgeClass = {
    stopped: "badge-gray",
    starting: "badge-yellow",
    active: "badge-green",
    stopping: "badge-yellow",
  }[status];

  const badgeText = {
    stopped: "Captions Off",
    starting: "Starting...",
    active: "● Live",
    stopping: "Stopping...",
  }[status];

  return (
    <div className="captions-wrapper">
      <div className="captions-controls">
        <button
          className="primary-btn"
          onClick={() => startTranscription()}
          disabled={status !== "stopped"}
        >
          Start Captions
        </button>
        <button
          className="secondary-btn"
          onClick={() => stopTranscription()}
          disabled={status !== "active"}
        >
          Stop Captions
        </button>
      </div>

      <span className={`status-badge ${badgeClass}`}>{badgeText}</span>

      <div className="captions-box">
        {captions.length === 0 ? (
          <p className="captions-empty">Captions will appear here when someone speaks...</p>
        ) : (
          captions.map((c, i) => (
            <div key={i} className="caption-line">
              <span className="caption-speaker">{c.participantName}:</span>
              <span className="caption-text">{c.text}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
