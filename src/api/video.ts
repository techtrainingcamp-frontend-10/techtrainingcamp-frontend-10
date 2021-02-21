import request from '../utils/request'

export const getVideoList = () => {
  return request.post('/searchVideo')
}
