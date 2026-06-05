export async function createMeeting({ token }) {
  const res = await fetch("https://api.videosdk.live/v2/rooms", {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to create meeting: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.roomId;
}
