export const addDataToLocalStorage = (localStorageKey, payload) => {
  localStorage.setItem(localStorageKey, payload)
}

export const getDataFromLocalStorage = (localStorageKey) => {
  return localStorage.getItem(localStorageKey)
}

export const removeDataFromLocalStorage = (localStorageKey) => {
  localStorage.removeItem(localStorageKey)
}
