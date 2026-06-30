export function convertToWebP(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error(`Browser could not encode ${file.name} as WebP`))
        },
        'image/webp',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error(`Could not load ${file.name}`))
    }

    img.src = url
  })
}
