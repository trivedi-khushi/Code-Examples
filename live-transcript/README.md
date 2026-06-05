# VideoSDK Live Captions Demo

A minimal React example that demonstrates the [VideoSDK](https://videosdk.live) **Live Captions** feature — starting, stopping, and displaying real-time speech transcriptions inside a live meeting.

Official Documentation for the Live Captions Feature [here](https://docs.videosdk.live/javascript/guide/interactive-live-streaming/live-captioning)

---

## 1. Overview

This example shows how to:

- Create a VideoSDK room via the REST API
- Join the room using `<MeetingProvider />` from `@videosdk.live/react-sdk`
- Start and stop live captions using the `useTranscription()` hook
- Display real-time captions in the UI, deduplicating VideoSDK's interim and final transcript events

---

## 2. Pre-Requisites

equisites

- Node.js 16+
- A free [VideoSDK account](https://app.videosdk.live/)
- A VideoSDK auth token (see step 4)

---

## 3. Set-Up

```bash
git clone https://github.com/trivedi-khushi/Code-Examples.git
cd Code-Examples/live-transcript
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

Open `http://localhost:5173` in your browser, click **Create & Join Meeting**, then click **Start Captions** and speak.

---

## 6. Key Files

| File | Purpose |
|---|---|
| `src/App.jsx` | Top-level state; switches between JoinScreen and MeetingProvider |
| `src/api.js` | `createMeeting()` REST helper for the VideoSDK rooms endpoint |
| `src/components/JoinScreen.jsx` | Single-button screen that creates and joins a room |
| `src/components/MeetingView.jsx` | Waits for meeting join, then renders the captions UI |
| `src/components/CaptionsView.jsx` | Start/Stop buttons and the scrolling captions display |
| `src/hooks/useCaptions.js` | Wrapper around VideoSDK's `useTranscription` hook with deduplication logic |
| `src/index.css` | Plain CSS styles for the demo |

---

## 7. How It Works


https://github.com/user-attachments/assets/1ef5d71d-49cd-4f76-bd85-d65507761cc3


VideoSDK fires three events per spoken phrase:

- `realtime` — partial transcript, updates as you speak
- `fullSentence` — completed phrase
- `realtime` (duplicate) — fired again at the same timestamp as `fullSentence`

`useCaptions.js` handles all three by updating the last caption line in-place while speaking, committing it on `fullSentence`, and skipping the duplicate `realtime` via timestamp comparison.

---

## 8. VideoSDK API Reference

- [`useTranscription()`](https://docs.videosdk.live/react/api/sdk-reference/use-transcription)
- [`startTranscription()`](https://docs.videosdk.live/js-sdk-reference/classes/Meeting#starttranscription)
- [`stopTranscription()`](https://docs.videosdk.live/js-sdk-reference/classes/Meeting#stoptranscription)
- [Live Captions Guide — JavaScript](https://docs.videosdk.live/javascript/guide/interactive-live-streaming/live-captioning)
