import { useWhiteboard } from "../hooks/useWhiteboard";

export default function WhiteboardView() {
  const { whiteboardUrl, startWhiteboard, stopWhiteboard } = useWhiteboard();
  return (
    <div className="whiteboard">
      <div className="whiteboard-controls">
        <button className="primary-btn" onClick={() => startWhiteboard()} disabled={!!whiteboardUrl}>
          Start Whiteboard
        </button>
        <button className="secondary-btn" onClick={() => stopWhiteboard()} disabled={!whiteboardUrl}>
          Stop Whiteboard
        </button>
      </div>
      {whiteboardUrl ? (
        <iframe src={whiteboardUrl} title="VideoSDK Whiteboard"
          style={{ width: "100%", height: "600px", border: "none" }}
          allow="camera; microphone; display-capture" />
      ) : (
        <div className="whiteboard-placeholder">Whiteboard not started yet</div>
      )}
    </div>
  );
}
