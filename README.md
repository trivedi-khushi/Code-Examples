# VideoSDK Whiteboard Demo

A minimal React example that demonstrates the [VideoSDK](https://videosdk.live) **Whiteboard** feature — starting, stopping, and embedding a collaborative whiteboard inside a live meeting.

Official Documentation for the Whitebaord Feature [here](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/whiteboard)

---

## 1. Overview

This example shows how to:

- Create a VideoSDK room via the REST API
- Join the room using `<MeetingProvider />` from `@videosdk.live/react-sdk`
- Start and stop a shared whiteboard session using the `useWhiteboard()` hook
- Embed the whiteboard URL returned by the SDK directly inside an `<iframe>`

---

## 2. Prerequisites

- Node.js 16+
- A free [VideoSDK account](https://app.videosdk.live/)
- A VideoSDK auth token key (see step 4)

---

## 3. Set-Up

```bash
git clone https://github.com/trivedi-khushi/whiteboard-buddy.git
cd whiteboard-buddy
npm install
```

Create a `.env` file at the project root:
VITE_VIDEOSDK_TOKEN=your_token_here


---

## 4. How to Get Your VideoSDK Token

1. Go to the [VideoSDK Dashboard](https://app.videosdk.live/dashboard)
2. Navigate to the **API Keys** section
3. Generate a **temporary token** — it's a long JWT string starting with `eyJ`
4. Paste it into your `.env` file as `VITE_VIDEOSDK_TOKEN`

> Do not use the API key itself — you need the generated JWT token.

---

## 5. Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser, click **Create & Join Meeting**, then click **Start Whiteboard**.

---

## 6. How It Works

### `createMeeting()` — `src/api.js`
Makes a `POST` request to `https://api.videosdk.live/v2/rooms` with the raw token in the `Authorization` header (no `Bearer` prefix). Returns the new `roomId`.

### `<MeetingProvider>` — `src/App.jsx`
VideoSDK's React context provider. Wraps the meeting UI and receives `meetingId`, `token`, and `joinWithoutUserInteraction: true` so the SDK joins as soon as the component mounts.

### `onMeetingJoined` event — `src/components/MeetingView.jsx`
Listens for the meeting to be fully joined before rendering the whiteboard UI. This ensures `useWhiteboard()` is ready before the user can interact.

### `useWhiteboard()` hook — `src/hooks/useWhiteboard.js`
Wraps VideoSDK's built-in `useWhiteboard` hook from `@videosdk.live/react-sdk`. Exposes three values:
- `startWhiteboard()` — starts the session for all participants
- `stopWhiteboard()` — stops the session for all participants
- `whiteboardUrl` — the embeddable URL, automatically set by the SDK once the session starts

### `<iframe>` embed — `src/components/WhiteboardView.jsx`
Once `whiteboardUrl` is available, it is rendered inside an `<iframe>`. No extra rendering library is needed — VideoSDK returns a fully hosted whiteboard page.

---

## 7. Key Files

| File | Purpose |
|---|---|
| `src/App.jsx` | Top-level state; switches between JoinScreen and MeetingProvider |
| `src/api.js` | `createMeeting()` REST helper for the VideoSDK rooms endpoint |
| `src/components/JoinScreen.jsx` | Single-button screen that creates and joins a room |
| `src/components/MeetingView.jsx` | Waits for meeting join, then renders the whiteboard UI |
| `src/components/WhiteboardView.jsx` | Start/Stop buttons and the iframe that embeds the whiteboard |
| `src/hooks/useWhiteboard.js` | Wrapper around VideoSDK's `useWhiteboard` hook |
| `src/index.css` | Plain CSS styles for the demo |

---

## 8. VideoSDK API Reference

- [`useWhiteboard()`](https://docs.videosdk.live/react/api/sdk-reference/use-whiteboard)
- [`startWhiteboard()`](https://docs.videosdk.live/js-sdk-reference/classes/Meeting#startwhiteboard)
- [`stopWhiteboard()`](https://docs.videosdk.live/js-sdk-reference/classes/Meeting#stopwhiteboard)
- [Whiteboard Guide — React](https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/whiteboard)

EOF