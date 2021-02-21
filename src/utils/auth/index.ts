export const setToken = (token: string) => {
  localStorage.setItem('userToken', token)
}

export const removeToken = () => {
  localStorage.removeItem('userToken')
}
