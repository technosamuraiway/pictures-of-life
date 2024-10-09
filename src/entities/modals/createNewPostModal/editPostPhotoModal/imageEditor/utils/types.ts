import { Area, Point } from 'react-easy-crop'

export interface ImageState {
  aspect: null | number
  crop: Point
  croppedAreaPixels: Area | null
  filter: string
  rotation?: number
  zoom: number
}
