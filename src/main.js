import { initDropzone } from "./dropzone.js";
import { convertToWebP } from "./converter.js";
import { addFileRow, setRowStatus, clearList } from "./ui.js";
import { downloadZip } from "./zipper.js";

const controls = document.getElementById("controls");
const qualityEl = document.getElementById("quality");
const qualityDisplay = document.getElementById("quality-display");
const summary = document.getElementById("summary");
const summaryText = document.getElementById("summary-text");
const downloadBtn = document.getElementById("download-btn");

let lastFiles = [];
let debounceTimer;
let pendingResults = [];

qualityEl.addEventListener("input", () => {
  qualityDisplay.value = qualityEl.value;
  if (!lastFiles.length) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => handleFiles(lastFiles), 1000);
});

downloadBtn.addEventListener("click", () => downloadZip(pendingResults));

initDropzone(handleFiles);

async function handleFiles(files) {
  if (!files.length) return;
  lastFiles = files;

  clearList();
  pendingResults = [];
  summary.hidden = true;
  controls.hidden = false;

  const qualityInt = parseInt(qualityEl.value, 10);
  const quality = qualityInt / 100;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const outName = file.name.replace(/\.(jpe?g|png)$/i, `_q${qualityInt}.webp`);
    addFileRow(i, outName);
    setRowStatus(i, "converting");

    try {
      const blob = await convertToWebP(file, quality);
      const name = outName;
      pendingResults.push({ name, blob });
      setRowStatus(i, "done", { originalSize: file.size, webpSize: blob.size });
    } catch (err) {
      setRowStatus(i, "error", { message: "Failed" });
      console.error(err);
    }
  }

  if (pendingResults.length) {
    const failed = files.length - pendingResults.length;
    summaryText.textContent = `${pendingResults.length} converted${failed ? `, ${failed} failed` : ""}`;
    summary.hidden = false;
  }
}
