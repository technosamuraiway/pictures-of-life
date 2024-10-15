import { authService } from '@/services'
import { createSelector } from 'reselect'

const meSelector = authService.endpoints.meCurInfo.select()

export const meSelectorData = createSelector(meSelector, res => res.data)
