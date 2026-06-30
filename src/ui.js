const list = () => document.getElementById('file-list')

export function addFileRow(id, outName) {
  const li = document.createElement('li')
  li.id = `row-${id}`
  li.innerHTML = `
    <span class="row-name" title="${outName}">${outName}</span>
    <span class="row-sizes" id="sizes-${id}"></span>
    <span class="badge badge-pending" id="badge-${id}">Pending</span>
  `
  list().appendChild(li)
}

export function setRowStatus(id, status, detail = {}) {
  const badge = document.getElementById(`badge-${id}`)
  const sizes = document.getElementById(`sizes-${id}`)
  if (!badge) return

  const labels = { pending: 'Pending', converting: 'Converting…', done: 'Done', error: 'Error' }
  badge.className = `badge badge-${status}`
  badge.textContent = status === 'error' && detail.message ? detail.message : labels[status]

  if (status === 'done' && detail.originalSize && detail.webpSize) {
    const saved = Math.round((1 - detail.webpSize / detail.originalSize) * 100)
    sizes.textContent = `${fmt(detail.originalSize)} → ${fmt(detail.webpSize)} (${saved > 0 ? `-${saved}%` : `+${Math.abs(saved)}%`})`
  }
}

export function clearList() {
  list().innerHTML = ''
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}
