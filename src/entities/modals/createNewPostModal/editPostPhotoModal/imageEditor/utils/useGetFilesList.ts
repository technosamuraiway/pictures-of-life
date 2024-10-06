import { getCroppedImg } from './getCroppedImages'
import { ImageState } from './types'

export const useGetFilesList = (downloadedImage: string[], imageStates: ImageState[]) => {
  const processAllImages = async (): Promise<File[]> => {
    const processedImages = await Promise.all(
      downloadedImage.map(async (image, index) => {
        const state = imageStates[index]
        let processedImageData: string

        if (state?.croppedAreaPixels) {
          processedImageData = await getCroppedImg(
            image,
            state.croppedAreaPixels,
            state.rotation ?? 0,
            state.filter || 'none'
          )
        } else {
          processedImageData = image.startsWith('data:') ? image : await fetchImageAsBase64(image)
        }

        // Convert base64 to blob
        const blob = await base64ToBlob(processedImageData)

        // Create File object
        return new File([blob], `processed_image_${index}.jpg`, { type: 'image/jpeg' })
      })
    )

    return processedImages.filter((img): img is File => img !== null)
  }

  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url)
    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const base64ToBlob = async (base64: string): Promise<Blob> => {
    const response = await fetch(base64)

    return response.blob()
  }

  return {
    processAllImages,
  }
}
