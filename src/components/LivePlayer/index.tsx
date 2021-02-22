import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import VliveComment from '../Vlivecomment'
import { Button } from 'antd'
import { commentLive } from '../../api/comment'

interface IProps {
  video: IVideo;
  active?: boolean;
}

interface IState {
  comment: string;
  isSendingComment: boolean;
}

class LivePlayer extends React.Component<IProps, IState> {
  liveComment: React.RefObject<VliveComment>

  constructor (props:IProps) {
    super(props)
    this.state = {
      comment: '',
      isSendingComment: false
    }
    this.liveComment = React.createRef()
  }

  handleNewComment = (e: any) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSendComment = async () => {
    this.setState({
      isSendingComment: true
    })
    try {
      await commentLive({
        comment: this.state.comment
      })
      this.setState({
        comment: ''
      })
    } catch (e) {
      console.log(e)
    }
    this.setState({
      isSendingComment: false
    })
    this.liveComment.current?.fetchCommentsLive({ videoId: this.props.video.videoId })
  }

  render () {
    const { _id, videoId, url } = this.props.video
    const { active } = this.props

    return (
      <div className={styles.live}>
        <Player _id={_id} id={videoId} url={url} type='live' active={active} />
        <div className={styles.info}>
          <div className={styles.liveComents}>
            <VliveComment ref={this.liveComment} type='live' id={videoId} />
            <div className={styles.input}>
              <input className={styles.input} value={this.state.comment} onChange={this.handleNewComment} placeholder='说点什么...' />
              <Button type='primary' size='small' shape='round' onClick={this.handleSendComment} loading={this.state.isSendingComment} disabled={this.state.comment === ''}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LivePlayer
