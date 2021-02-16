import React from 'react'
import './index.scss'
// import { Drawer, Button, Radio, Space } from 'antd'
import { Drawer, Typography, Avatar, Form, Button, Input } from 'antd'
import { UserOutlined, HeartFilled, SmileOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjszhcn from 'dayjs/locale/zh-cn'
const { TextArea } = Input
const { Link } = Typography
dayjs.extend(relativeTime)
dayjs.locale(dayjszhcn)

interface ICommentProps{
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
        <div className='vcomt-comt-like'>
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
  onSubmit: (data: any) => void
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
            Add Comment
          </Button>
        </Form.Item>
      </>
    )
  }
}

interface IProps {
  }

  interface IState {
    vid: number,
    visible: boolean,
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

class VcommentDrawer extends React.Component<IProps, IState> {
  constructor (props:IProps) {
    super(props)
    const mock:ICommentProps = {
      avatar: 'string',
      pname: 'string',
      ptime: 'string',
      like: true,
      likeCount: 1,
      content: 'string'
    }
    this.state = { vid: 1, visible: true, placement: 'left', count: 1, isTypeing: false, isEmojing: false, comments: [mock, mock, mock], newComment: '', isSubmitting: false }
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  };

  handleClose = () => {
    this.setState({
      visible: false
    })
  };

  handleSubmit = () => {
    if (!this.state.newComment) {
      return
    }
    this.setState({
      isSubmitting: true
    })
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        newComment: '',
        comments: [
          ...this.state.comments,
          {
            avatar: '',
            pname: '你自己',
            ptime: dayjs(new Date()).fromNow(),
            like: false,
            likeCount: 0,
            content: this.state.newComment
          }
        ]
      })
    }, 1000)
  };

  handleChange = (e: any): void => {
    this.setState({
      newComment: e.target.value
    })
  };

  render () {
    return (
      <>
        <Drawer
          title='250 条评论'
          placement='bottom'
          closable
          onClose={this.handleClose}
          visible={this.state.visible}
          key={this.state.placement}
          footer={
            <div><VcommentAppeal />
              <VcommentEditor submitting={this.state.isSubmitting} value={this.state.newComment} onChange={this.handleChange} onSubmit={this.handleSubmit} />
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
