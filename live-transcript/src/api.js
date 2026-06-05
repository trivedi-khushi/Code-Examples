/**
 * api.js - Thin wrapper around the VideoSDK REST API.
 * Docs: https://docs.videosdk.live/api-reference/realtime-communication/create-room
 */

/**
 * createMeeting - Creates a new VideoSDK room and returns its roomId.
 * @param {{ token: string }} params
 * @returns {Promise<string>} roomId
 */
export async function createMeeting({ token }) {
  const res = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to create meeting: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.roomId;
}
