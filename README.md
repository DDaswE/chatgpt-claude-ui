# ChatGPT Claude-Like UI

A Chrome extension that reshapes the ChatGPT web interface into a calmer, more editorial reading experience inspired by Claude.

## Why this exists

ChatGPT's default web UI is functional, but its reading rhythm can feel dense and uneven during long sessions. This project focuses on the presentation layer only:

- a centered conversation lane
- a more readable assistant prose width
- softer typography and spacing
- quick controls from the extension popup
- a full settings page for finer tuning

The composer stays native, so typing still feels like standard ChatGPT.

## Features

- Claude-like centered reading layout for ChatGPT replies
- Adjustable conversation rail width
- Adjustable assistant prose width
- Multiple reply font presets
- Popup for fast typography tweaks
- Full options page with live preview
- Works on both `chatgpt.com` and `chat.openai.com`

## Included controls

From the popup or options page, you can adjust:

- enable / disable the restyle
- reply font preset
- reply font size
- reply line height
- conversation rail width
- assistant prose width

## How it works

The extension uses a small MV3 content script and CSS override layer. It does not rewrite ChatGPT messages or interfere with model output. Instead, it:

- targets stable layout wrappers around each conversation turn
- constrains assistant reply width to a more editorial measure
- updates typography only in the response area
- keeps the ChatGPT composer visually and behaviorally native

## Project structure

```text
chatgpt-claude-ui/
├── manifest.json
├── content.js
├── content.css
├── settings.js
├── popup.html
├── popup.css
├── popup.js
├── options.html
├── options.css
└── options.js
```

## Installation

### Option 1: Load unpacked

1. Open `chrome://extensions`
2. Turn on `Developer mode`
3. Click `Load unpacked`
4. Select the `chatgpt-claude-ui` folder

### Option 2: Use a packaged zip

If you already have a packaged release, load the unpacked version after extracting it.

## Supported URLs

- `https://chatgpt.com/*`
- `https://chat.openai.com/*`

## Current version

`0.2.1`

## Notes

- This project is intentionally UI-only.
- It does not change the actual conversation content.
- Small selector adjustments may occasionally be needed when ChatGPT updates its frontend.

## Roadmap

- better citation / source alignment handling
- more typography presets
- optional theme packs
- export / import settings
