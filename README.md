# WebP Converter — Best Access Doors

Internal tool for bulk-converting JPG/PNG product images to WebP format. Runs entirely in the browser — no uploads, no server, files stay on your machine.

**Live:** https://mlechugaBEST.github.io/webp-converter/

---

## Features

- Drag-and-drop files or a folder
- Bulk conversion (entire folders at once)
- Quality slider (1–100) with live re-conversion — adjust after dropping, results update automatically
- Output filenames include quality suffix (e.g. `banner_q85.webp`)
- Size comparison per file (original → WebP, % saved)
- Download all converted files as a ZIP

## Usage

1. Open the tool in your browser
2. Drop JPG/PNG files or a folder onto the drop zone — or use the **Select Files** / **Select Folder** buttons
3. Adjust the **Quality** slider if needed (default: 85)
4. Files reconvert automatically after you stop moving the slider
5. Click **Download ZIP** when done

## Tech Stack

- Vite (vanilla JS, no framework)
- Canvas API for client-side WebP conversion
- JSZip + FileSaver.js for ZIP download
- GitHub Actions → GitHub Pages for deployment

## Local Development

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
```

## Deploy

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

> Repo → Settings → Pages → Source must be set to **GitHub Actions** (one-time setup).

---

Best Access Doors — Internal Tool
