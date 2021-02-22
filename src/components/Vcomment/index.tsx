import React from 'react'
import './index.scss'
// import { Drawer, Button, Radio, Space } from 'antd'
import { Drawer, Typography, Avatar, Form, Button, Input } from 'antd'
import { UserOutlined, HeartFilled, SmileOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjszhcn from 'dayjs/locale/zh-cn'
import { Picker } from 'emoji-mart'
import { comment, getComment, likeComment } from '../../api/comment'
const { TextArea } = Input
const { Link } = Typography
dayjs.extend(relativeTime)
dayjs.locale(dayjszhcn)

interface ICommentProps{
  id: string,
  avatar:string,
  pname:string,
  ptime:string,
  like:boolean,
  likeCount:number,
  content:string
}
interface ICommentState{
  isLiked:boolean
}
class Comment extends React.Component<ICommentProps, ICommentState> {
  constructor (props: ICommentProps) {
    super(props)
    this.state = { isLiked: false }
  }

  submitLike ():void {
    if (this.state.isLiked) { return }
    likeComment({
      commentId: this.props.id
    })
      .then((response:any):void => {
        const data = response.data
        if (!data.success) { return }
        this.setState({ isLiked: true })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleLike = (): void => {
    if (this.state.isLiked) { return }
    likeComment({
      commentId: this.props.id
    })
      .then((response:any):void => {
        const data = response.data
        if (!data.success) { return }
        this.setState({ isLiked: true })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='vcomt-comt-wrapper'>
        <div className='vcomt-comt-avatar'>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className='vcomt-comt-content'>
          <div className='vcomt-comt-content-uname'>
            {this.props.pname}
          </div>
          <div className='vcomt-comt-content-commt'>
            {this.props.content}
          </div>
          <div className='vcomt-comt-content-action'>
            <div className='vcomt-comt-content-action-time'>
              {this.props.ptime}
            </div>
            <div className='vcomt-comt-content-action-reply'>
              <Link>回复</Link>
            </div>
          </div>
        </div>
        <div className='vcomt-comt-like' onClick={this.handleLike}>
          <HeartFilled className={this.state.isLiked ? 'liked' : ''} />
          <div className='vcomt-comt-like-num'>{this.state.isLiked ? this.props.likeCount + 1 : this.props.likeCount}</div>
        </div>
      </div>
    )
  }
}
class VcommentAppeal extends React.Component {
  render () {
    return (
      <div className='vcomt-action-appeal'>
        <div className='vcomt-action-appeal-text-area'>
          留下你的精彩评论吧
        </div>
        <div className='vcomt-action-appeal-micro-btn'>
          <SmileOutlined />
        </div>
      </div>
    )
  }
}
interface IPropsVcommentEditor{
  onChange: (data: any) => void,
  value: string,
  submitting: boolean,
  onSubmit: (data: any) => void,
  onOpenEmoji: () => void
}
class VcommentEditor extends React.Component<IPropsVcommentEditor, any> {
  // constructor(props: IPropsVcommentEditor){
  //   super(props)

  // }
  render () {
    return (
      <>
        <Form.Item>
          <TextArea rows={3} onChange={this.props.onChange} value={this.props.value} />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' loading={this.props.submitting} onClick={this.props.onSubmit} type='primary'>
            评论一下
          </Button>
          <div className='vcomt-action-appeal-micro-btn' onClick={this.props.onOpenEmoji}>
            <SmileOutlined />
          </div>
        </Form.Item>
      </>
    )
  }
}

interface IProps {
  videoId: number,
  visible: boolean,
  onCmtClose: any
  }

  interface IState {
    showEmojiModal: boolean,
    vid: number,
    placement: string,
    count: number,
    isTypeing: boolean,
    isEmojing: boolean,
    isSubmitting: boolean,
    newComment: string,
    comments:ICommentProps[]
  }
// class VCommentWrapper extends React.Component<IProps, IState> {
// //   constructor(props:IProps){
// //     super(props);
// // }
//   // constructor (props:IProps) {
//   //   super(props)
//   //   const mock:ICommentProps = {
//   //     avatar: 'string',
//   //     pname: 'string',
//   //     ptime: 'string',
//   //     like: true,
//   //     likeCount: 1,
//   //     content: 'string'
//   //   }
//   // }

//   render () {
//     return (
//       <div className='vcomt-wrapper'>
//         <Comment {...this.state.comments[0]} />
//       </div>
//     )
//   }
// }
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
class VcommentDrawer extends React.Component<IProps, IState> {
  constructor (props:IProps) {
    super(props)
    const mock:ICommentProps = {
      id: 'null',
      avatar: 'string',
      pname: 'string',
      ptime: 'string',
      like: true,
      likeCount: 1,
      content: 'string'
    }
    this.state = { showEmojiModal: false, vid: this.props.videoId, placement: 'left', count: 1, isTypeing: false, isEmojing: false, comments: [mock, mock, mock], newComment: '', isSubmitting: false }
    const request: commentRequest = { videoId: this.props.videoId }
    this.fetchComments(request)
  }

  fetchComments (videoInfo:commentRequest):any {
    getComment({
      videoId: videoInfo.videoId
    })
      .then((response:any):void => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        console.log(data)
        data = data.map((comment:commentResponse): ICommentProps => { return { id: comment._id, avatar: 'null', pname: comment?.userItem?.userName, ptime: dayjs(comment.createdAt).fromNow(), likeCount: comment.liked, like: false, content: comment.comment } })
        console.log(data)
        this.setState({ comments: data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleClose = () => {
    this.props.onCmtClose(false)
  };

  handleSubmit = () => {
    if (!this.state.newComment) {
      return
    }
    this.setState({
      isSubmitting: true
    })
    comment({
      comment: this.state.newComment,
      videoId: this.props.videoId
    })
      .then((response:any):void => {
        const data = response.data
        if (!data.success) { return }
        setTimeout(() => {
          this.setState({
            isSubmitting: false,
            newComment: '',
            comments: [
              ...this.state.comments,
              {
                id: data.success,
                avatar: '',
                pname: '我',
                ptime: dayjs(new Date()).fromNow(),
                like: false,
                likeCount: 0,
                content: this.state.newComment
              }
            ]
          })
        }, 500)
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  handleChange = (e: any): void => {
    this.setState({
      newComment: e.target.value
    })
  };

  drawerChange = (visible: boolean):void => {
    console.log(visible)
  }

  addEmoji = (emoji: any, event: any):void => {
    this.setState({ newComment: this.state.newComment + emoji.native, showEmojiModal: false })
  }

  handleOpenEmojiModel = ():void => {
    this.setState({ showEmojiModal: !this.state.showEmojiModal })
  }

  render () {
    return (
      <>
        <Drawer
          title={this.state.comments.length >= 0 ? `${this.state.comments.length} 条评论` : '评论区'}
          placement='bottom'
          closable
          onClose={this.handleClose}
          visible={this.props.visible}
          key={this.state.placement}
          afterVisibleChange={this.drawerChange}
          footer={
            <div><VcommentAppeal />
              <div className='emoji-container'>
                {this.state.showEmojiModal && <Picker
                  set='apple'
                  emoji=''
                  skin={1}
                  showPreview={false}
                  style={{ position: 'absolute', bottom: '70px', left: '8px', zIndex: 1 }}
                  onClick={(emoji :any, event :any):void => this.addEmoji(emoji, event)}
                                              />}
              </div>
              <VcommentEditor submitting={this.state.isSubmitting} value={this.state.newComment} onChange={this.handleChange} onSubmit={this.handleSubmit} onOpenEmoji={this.handleOpenEmojiModel} />
            </div>
            }
          height={500}
          bodyStyle={{ paddingLeft: 5, paddingRight: 5 }}
        >
          {this.state.comments.map((comment, index) => {
            return (
              <Comment {...comment} key={index} />
            )
          })}
        </Drawer>
      </>
    )
  }
}

export default VcommentDrawer
export type { ICommentProps }
