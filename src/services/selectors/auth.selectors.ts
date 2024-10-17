import { authService } from '@/services'
import { createSelector } from 'reselect'

const meSelector = authService.endpoints.meCurInfo.select()

export const meSelectorData = createSelector(meSelector, res => res.data)

/* ⛔ экмпортировать селекторы только напрямую, т.е. не использовать index
       если использовать index, то будет ошибка endpoints:

       почему пользуемся selector для me-request?
       в проекте мы делаем me-request в AuthGuard и Layout, и когда запрос падает в AuthGuard,
       то он почему-то не кешируется, и повторяется в Layout. Таким орбазом у нас делаются два
       одинаковых запроса... поэтому me-request будем делать только в AuthGuard, а данные будем
       доставать через selector
*/
