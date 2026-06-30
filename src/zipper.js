import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export async function downloadZip(blobs) {
  const zip = new JSZip()
  for (const { name, blob } of blobs) {
    zip.file(name, blob)
  }
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 1 }
  })
  saveAs(zipBlob, 'webp-images.zip')
}
