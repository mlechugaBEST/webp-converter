export function initDropzone(onFiles) {
  const zone = document.getElementById('dropzone')
  const fileInput = document.getElementById('file-input')
  const folderInput = document.getElementById('folder-input')

  zone.addEventListener('dragover', (e) => {
    e.preventDefault()
    zone.classList.add('drag-over')
  })

  zone.addEventListener('dragleave', (e) => {
    if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over')
  })

  zone.addEventListener('drop', (e) => {
    e.preventDefault()
    zone.classList.remove('drag-over')
    onFiles(filterImages(e.dataTransfer.files))
  })

  fileInput.addEventListener('change', () => {
    onFiles(filterImages(fileInput.files))
    fileInput.value = ''
  })

  folderInput.addEventListener('change', () => {
    onFiles(filterImages(folderInput.files))
    folderInput.value = ''
  })
}

function filterImages(fileList) {
  return Array.from(fileList).filter(
    (f) => f.type === 'image/jpeg' || f.type === 'image/png'
  )
}
