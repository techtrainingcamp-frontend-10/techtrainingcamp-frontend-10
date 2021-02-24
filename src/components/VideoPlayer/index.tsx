import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import classNames from 'classnames'
import { Button } from 'antd'
import { UpCircleOutlined } from '@ant-design/icons'
import VliveComment from '../Vlivecomment'
import VcommentDrawer from '../Vcomment'
import { createDanmuku } from '../../api/danmuku'
import Like from '../../components/Like'

interface IProps {
  video: IVideo;
  active?: boolean;
  onLiked?: Function;
}

interface IState {
  newDmk: string,
  timeStamp: number,
  isSendingDmk: boolean,
  showCmtDrawer: boolean
}

class VideoPlayer extends React.Component<IProps, IState> {
  ChildPlayer: any
  handleNewDmkChange = (e: any):void => {
    this.setState({ newDmk: e.target.value })
  }

  constructor (props: IProps) {
    super(props)
    this.state = { newDmk: '', timeStamp: 0, isSendingDmk: false, showCmtDrawer: false }
  }

  handleSendDmk = (e:any):void => {
    if (!this.state.newDmk) { return }
    this.setState({ isSendingDmk: true })
    createDanmuku({
      vedioId: this.props.video._id,
      content: this.state.newDmk,
      size: 20,
      start: this.state.timeStamp,
      color: '#001835'
    }).then((response:any) => {
      if (response.data.success) {
        this.setState({ newDmk: '' })
        this.ChildPlayer && this.ChildPlayer.appendDmk({ ...response.data.data, start: (this.state.timeStamp + 1500) })
      }
    }).catch(err => console.log(err)).finally(() => { this.setState({ isSendingDmk: false }) })
  }

  handleTimeChange = (timeStamp: number):void => {
    this.setState({ timeStamp: timeStamp })
  }

  handleDrawer = (isOpen: boolean):void => {
    this.setState({ showCmtDrawer: isOpen })
  }

  handleOpenCmt = ():void => {
    this.setState({ showCmtDrawer: true })
  }

  handleLiked = () => {
    if (this.props.onLiked) {
      this.props.onLiked(this.props.video)
    }
  }

  render () {
    const { _id, videoId, url, User, likeCounts, commentsCount, description, tags } = this.props.video
    const { active } = this.props

    return (
      <div className={classNames(styles.video, { 'video-avtice': active })}>
        <Player _id={_id} id={videoId} url={url} type='video' active={active} onTimeChange={this.handleTimeChange} onRef={(c:any) => { this.ChildPlayer = c }} />
        <VcommentDrawer videoId={videoId} visible={this.state.showCmtDrawer} onCmtClose={this.handleDrawer} />
        <div className={styles.info}>
          <div className={styles.liveComents}>
            <VliveComment type='video' id={videoId} />
          </div>
          <div className={styles.author}>
            @{User[0].userName}
          </div>
          <div className={styles.description}>
            {description}
          </div>
          <div className={styles.tags}>
            {tags && tags.map(tagName => {
              return (<span className={styles.tag} key={tagName}>#{tagName}</span>)
            })}
          </div>
          <div className={styles.danmu}>
            <input value={this.state.newDmk} onChange={this.handleNewDmkChange} placeholder='发个友善的弹幕见证当下' />
            <Button type='primary' shape='circle' icon={<UpCircleOutlined />} size='middle' onClick={this.handleSendDmk} loading={this.state.isSendingDmk} />
          </div>
        </div>
        <div className={styles.action}>
          <Like videoId={videoId} num={likeCounts} onLiked={this.handleLiked} />
          <div className={styles.comment} onClick={this.handleOpenCmt}>
            <div className={styles['comment-icon']} />
            <div className={styles['comment-number']}>{commentsCount}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
