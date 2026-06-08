# Fake News Detection Frontend

A React + TypeScript + Vite frontend for a fake news detection system.

## Overview

This app provides a polished UI for:

- Text analysis of news claims
- Image OCR analysis using `tesseract.js`
- Link verification via URL content extraction
- Animated layout powered by `framer-motion`
- Mode selection between text, image, and link workflows

## Getting Started

### Install dependencies

From the `Frontend/` folder:

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Backend integration

The frontend expects a backend API URL configured with `VITE_API_URL`.

Example in `Frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5000
```

The backend is used to:

- classify text predictions
- extract text from URLs
- handle OCR results from image uploads

## App structure

Key files:

- `src/main.tsx` — app entry point and router configuration
- `src/pages/HomePage.tsx` — landing page and feature overview
- `src/pages/MainApp.tsx` — main analysis workspace
- `src/pages/TextPanel.tsx` — text detection interface
- `src/pages/ImagePanel.tsx` — image upload and OCR workflow
- `src/pages/LinkPanel.tsx` — link verification interface
- `src/components/LeftToolbar.tsx` — mode selector buttons

## Features

- Home landing page with CTA and feature cards
- Sidebar mode switching
- Text input, image upload, and URL entry workflows
- Reactive status indicator and animated UI
- Tailwind CSS styling with responsive layout

## Dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `framer-motion`
- `tailwindcss`
- `tesseract.js`

Dev dependencies include Vite, TypeScript, ESLint, and React plugin support.

## Notes

- The frontend is designed to pair with the backend in the same repository.
- Keep `VITE_API_URL` pointing to the running backend server.
- If you update backend ports, change the environment variable accordingly.
