import request from '../utils/request'

export const getVideoList = () => {
  return request.post('/searchVideo')
}

export const likeVideo = (data: {
  videoId: number
}) => {
  return request.post('/like', data)
}
