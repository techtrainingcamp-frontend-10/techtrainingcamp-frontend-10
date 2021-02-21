import request from '../utils/request'

export const getComment = (data: any) => {
  return request.post('/getComment', data)
}
