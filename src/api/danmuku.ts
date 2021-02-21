import request from '../utils/request'

export const createDanmuku = (data: any) => {
  return request.post('/createDanmuku', data)
}
