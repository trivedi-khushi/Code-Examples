# VideoSDK Code Examples

A collection of minimal React demos built with [VideoSDK](https://videosdk.live), each showcasing a single SDK feature end-to-end.

---

## Projects

| Project | Feature | Folder |
|---|---|---|
| 🎙️ Live Captions | Real-time speech transcription in a live meeting | [`live-transcript/`](./live-transcript) |
| 🖊️ Whiteboard | Collaborative whiteboard embedded in a live meeting | [`whiteboard/`](./whiteboard) |

---

## 1. Live Captions

Start, stop, and display real-time speech transcriptions inside a meeting using `useTranscription()`.

→ [README](./live-transcript/README.md) · [Official Feature Docs](https://docs.videosdk.live/javascript/guide/interactive-live-streaming/live-captioning) [Implementation Demo](https://github.com/trivedi-khushi/Code-Examples/blob/main/live-transcript/README.md#7-how-it-works)

```bash
cd live-transcript
npm install && npm run dev
```

---

## 2. Whiteboard

Start, stop, and embed a collaborative whiteboard session inside a meeting using `useWhiteboard()`.

→ [README](./whiteboard/README.md) · [Official Feature Docs](https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/whiteboard) [Implementation Demo](https://github.com/trivedi-khushi/Code-Examples/blob/main/whiteboard/README.md#6-how-it-works)

```bash
cd whiteboard
npm install && npm run dev
```

---

## Prerequisites

All projects share the same requirements:

- Node.js 16+
- A free [VideoSDK account](https://app.videosdk.live/)
- A VideoSDK JWT token from the [Dashboard](https://app.videosdk.live/dashboard) → API Keys

Each project needs a `.env` file at its root:
VITE_VIDEOSDK_TOKEN=your_token_here

---

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [@videosdk.live/react-sdk](https://www.npmjs.com/package/@videosdk.live/react-sdk)
