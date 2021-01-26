import request from '../utils/request'

export const getLiveList = () => {
  return request.get('/getLiveList')
}
