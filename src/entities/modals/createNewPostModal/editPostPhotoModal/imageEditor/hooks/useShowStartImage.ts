import type { ImageData } from '../ImageEditor'

export const useShowStartImage = (
  downloadedImage: (File | string)[],
  setImages: (images: ((prevImages: ImageData[]) => ImageData[]) | ImageData[]) => void
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

  const imgOnload = (img: HTMLImageElement): void => {
    setImages((prevImages: ImageData[]) => {
      const newImage = {
        aspectRatio: 'original',
        filters: [],
        id: Date.now().toString(),
        image: img,
        scale: 1,
      }

      if (downloadedImage.length === 1) {
        return [newImage]
      } else if (downloadedImage.length > 10) {
        return [...prevImages]
      } else {
        return [...prevImages, newImage]
      }
    })
  }

  return {
    showDownloadedImage,
  }
}
