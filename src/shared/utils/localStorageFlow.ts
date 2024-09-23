// Функция для сохранения данных (объектов и не только) в память браузера:
export function saveStateToLocalStorage<T>(key: string, state: T) {
  const stateAsString = JSON.stringify(state)

  localStorage.setItem(key, stateAsString)
}

/* Пример использования:
interface IStateType {
    x: string
    y: number
}

сохраняем объект типа IStateType в ячейке 'testObject'
saveStateToLocalStorage<StateType>('testObject', { x: 'A', y: 1 })

сохраняем строку в ячейке 'testString'
saveStateToLocalStorage<string>('testString', 'Life is good!')
*/
// ---------------------------------------------------------------------------------------------------------------

// Функция для получения данных (сохранённого объекта и не только) из памяти браузера:
export function restoreStateFromLocalStorage<T>(key: string, defaultState: T) {
  if (typeof window !== 'undefined') {
    return defaultState
  }

  let state = defaultState
  const stateAsString = localStorage.getItem(key)

  if (stateAsString !== null) {
    state = JSON.parse(stateAsString) as T
  }

  return state
}

/* Пример использования:
interface IStateType {
    x: string
    y: number
}

получаем объект типа IStateType из ячейки 'testObject' или default объект если ячейка пуста
restoreStateFromLocalStorage<StateType>('testObject', { x: 'Default string', y: 25 })

получаем строку из ячейки 'testString' или default string если ячейка пуста
restoreStateFromLocalStorage<string>('testString', 'Default string')
*/
