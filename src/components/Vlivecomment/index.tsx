import React from 'react'
import './index.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ICommentProps } from '../Vcomment'
import { getComment } from '../../api/comment'

// interface VliveCommentProps{
//   uname: string,
//   content: string,
//   cId: string
// }
interface VliveCommentState{
  displayComents: ICommentProps[],
  allComments: ICommentProps[],
  displayIndex: number,
  bufferSize: number,
  isPause: boolean
}
class VliveComment extends React.Component <ICommentProps, any> {
  render () {
    return (
      <div className='vlive-comment-item-wrapper'>
        <span className='vlive-comment-item-uname'>{this.props.pname}</span>{this.props.content}
      </div>
    )
  }
}
interface commentRequest{
  videoId: number
}
interface commentResponse{
  _id: string,
  comment: string,
  createdAt: Date,
  updatedAt: Date,
  isReply: boolean,
  liked: number,
  replyTo: string,
  userId: string,
  videoId: string,
  userItem: any,
  videoItem: any
}

interface IVliveCommentWrapperProps {
  id: number;
}

class VliveCommentWrapper extends React.Component<IVliveCommentWrapperProps, VliveCommentState> {
  demoo:ICommentProps = { id: 'name', content: 'ikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuikuiku', pname: '11', ptime: '1', like: false, avatar: 's', likeCount: 1 }
  demomo:ICommentProps[] = [this.demoo]
  wrapper: HTMLDivElement | null | undefined
  constructor (props:any) {
    super(props)
    this.state = { displayIndex: 0, bufferSize: 2, displayComents: [], allComments: [], isPause: false }
  }

  componentDidMount () {
    this.fetchComments({ videoId: this.props.id })
    setInterval(():void => {
      if (this.state.isPause) { return }
      const comments = this.state.displayComents
      this.state.displayIndex - this.state.bufferSize >= 0 && delete comments[this.state.displayIndex - this.state.bufferSize]
      const nextCmt = this.state.allComments[this.state.displayIndex % this.state.allComments.length]
      nextCmt && this.setState({ displayComents: comments.concat(nextCmt), displayIndex: (this.state.displayIndex + 1) })
      //  this.scrollToBottom()
    }, 1500)
  }

  scrollToBottom = () => {
    const messagesEndRef = document.getElementById('messagesEndRef')
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' })
  };

  handleTap = (e:any):void => {
    const clientHeight = this.wrapper?.clientHeight
    const scrollHeight = this.wrapper?.scrollHeight
    const scrollTop = this.wrapper?.scrollTop
    const isBottom = !(clientHeight && scrollTop && scrollHeight && scrollHeight > clientHeight && clientHeight + scrollTop === scrollHeight)
    this.setState({ isPause: isBottom })
  }

  fetchComments (videoInfo:commentRequest):any {
    getComment({
      videoId: videoInfo.videoId
    })
      .then((response:any):void => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        data = data.map((comment:commentResponse): ICommentProps => { return { id: comment._id, avatar: 'null', pname: comment?.userItem?.userName, ptime: comment.createdAt.toString(), likeCount: comment.liked, like: false, content: comment.comment } })
        this.setState({ allComments: data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='vlive-comment-wrapper' onTouchEnd={this.handleTap} ref={(c) => { this.wrapper = c }}>
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {this.state.displayComents.map((item, index) => {
            return (

              <VliveComment {...item} key={index} />
            )
          })}
          <div id='messagesEndRef' />
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default VliveCommentWrapper
