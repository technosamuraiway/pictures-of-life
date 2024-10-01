export const useShowStartImageModal = (
  downloadedImage: (File | string)[],
  setImages: (images: ImageData[]) => void
) => {
  const showDownloadedImage = () => {
    Array.from(downloadedImage).forEach(file => {
      if (typeof file === 'string') {
        const img = new window.Image()

        img.onload = () => imgOnload(img)

        img.src = file
      } else {
        const reader = new FileReader()

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const img = new window.Image()

          img.onload = () => imgOnload(img)

          img.src = event.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const imgOnload = (img: HTMLImageElement) => {
    return setImages(prevImages => [
      ...prevImages,
      {
        aspectRatio: 'original',
        filters: [],
        id: Date.now().toString(),
        image: img,
        scale: 1,
      },
    ])
  }

  return {
    showDownloadedImage,
  }
}
