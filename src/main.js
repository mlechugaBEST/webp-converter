import { initDropzone } from './dropzone.js'
import { convertToWebP } from './converter.js'
import { addFileRow, setRowStatus, clearList } from './ui.js'
import { downloadZip } from './zipper.js'

const controls  = document.getElementById('controls')
const qualityEl = document.getElementById('quality')
const qualityDisplay = document.getElementById('quality-display')
const summary   = document.getElementById('summary')
const summaryText = document.getElementById('summary-text')
const downloadBtn = document.getElementById('download-btn')

qualityEl.addEventListener('input', () => {
  qualityDisplay.value = qualityEl.value
})

let pendingResults = []

downloadBtn.addEventListener('click', () => downloadZip(pendingResults))

initDropzone(handleFiles)

async function handleFiles(files) {
  if (!files.length) return

  clearList()
  pendingResults = []
  summary.hidden = true
  controls.hidden = false

  const quality = parseInt(qualityEl.value, 10) / 100

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    addFileRow(i, file.name)
    setRowStatus(i, 'converting')

    try {
      const blob = await convertToWebP(file, quality)
      const name = file.name.replace(/\.(jpe?g|png)$/i, '.webp')
      pendingResults.push({ name, blob })
      setRowStatus(i, 'done', { originalSize: file.size, webpSize: blob.size })
    } catch (err) {
      setRowStatus(i, 'error', { message: 'Failed' })
      console.error(err)
    }
  }

  if (pendingResults.length) {
    const failed = files.length - pendingResults.length
    summaryText.textContent = `${pendingResults.length} converted${failed ? `, ${failed} failed` : ''}`
    summary.hidden = false
  }
}
