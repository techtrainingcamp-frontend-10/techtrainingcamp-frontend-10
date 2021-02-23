import request from '../utils/request'

export const getUserBadges = (data: any) => {
  return request.post('/getUserBadges', data)
}

export const updateUser = (data: any) => {
  return request.post('/updateUser', data)
}
export const getUserInfo = (data: any) => {
  return request.post('/getUserInfo', data)
}
