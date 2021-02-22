import request from '../utils/request'

export const getComment = (data: any) => {
  return request.post('/getComment', data)
}

export const likeComment = (data: any) => {
  return request.post('/likeComment', data)
}

export const comment = (data: any) => {
  return request.post('/comment', data)
}

export const getCommentLive = (data: any) => {
  return request.post('/getCommentLive', data)
}

export const commentLive = (data: any) => {
  return request.post('/commentLive', data)
}
