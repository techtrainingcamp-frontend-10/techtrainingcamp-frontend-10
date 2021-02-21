export const getToken = () => {
  return localStorage.getItem('userToken')
}

export const setToken = (token: string) => {
  localStorage.setItem('userToken', token)
}

export const removeToken = () => {
  localStorage.removeItem('userToken')
}

export const getUserId = () => {
  return localStorage.getItem('userID')
}

export const setUserId = (userId: string) => {
  localStorage.setItem('userID', userId)
}

export const removeUserId = () => {
  localStorage.removeItem('userId')
}
