/**
 * useWhiteboard - Thin wrapper around VideoSDK's built-in useWhiteboard hook.
 * The React SDK exposes startWhiteboard(), stopWhiteboard(), and whiteboardUrl
 * directly — no need to wire useMeeting() events manually.
 */
import { useWhiteboard as useVideoSDKWhiteboard } from "@videosdk.live/react-sdk";

export function useWhiteboard() {
  const { startWhiteboard, stopWhiteboard, whiteboardUrl } = useVideoSDKWhiteboard();

  return { startWhiteboard, stopWhiteboard, whiteboardUrl };
}
