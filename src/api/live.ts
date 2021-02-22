import request from '../utils/request'

export const getLiveList = () => {
  return request.post('/searchLive')
}
