import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import classNames from 'classnames'
import { Button } from 'antd'
import { UpCircleOutlined } from '@ant-design/icons'
import VliveComment from '../Vlivecomment'
import { createDanmuku } from '../../api/danmuku'

interface IProps {
  video: IVideo;
  active?: boolean;
}

interface IState {
  newDmk: string,
  timeStamp: number,
  isSendingDmk: boolean
}

class VideoPlayer extends React.Component<IProps, IState> {
  ChildPlayer: any
  handleNewDmkChange = (e: any):void => {
    this.setState({ newDmk: e.target.value })
  }

  constructor (props: IProps) {
    super(props)
    this.state = { newDmk: '', timeStamp: 0, isSendingDmk: false }
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
        this.ChildPlayer && this.ChildPlayer.appendDmk({ ...response.data.data, start: (response.data.data.start + 1500) })
      }
    }).catch(err => console.log(err)).finally(() => { this.setState({ isSendingDmk: false }) })
  }

  handleTimeChange = (timeStamp: number):void => {
    this.setState({ timeStamp: timeStamp })
  }

  render () {
    const { _id, url, ownerId, likeCounts, commentsCount } = this.props.video
    const { active } = this.props

    // TODO: wait to add
    const description = '无'
    const tagList = ['1', '2', '3']

    return (
      <div className={classNames(styles.video, { 'video-avtice': active })}>
        <Player id={_id} url={url} type='video' active={active} onTimeChange={this.handleTimeChange} onRef={(c:any) => { this.ChildPlayer = c }} />
        <div className={styles.info}>
          <div className={styles.liveComents}>
            <VliveComment id={_id} />
          </div>
          <div className={styles.author}>
            @{ownerId}
          </div>
          <div className={styles.description}>
            {description}
          </div>
          <div className={styles.tags}>
            {tagList && tagList.map(tagName => {
              return (<span className={styles.tag} key={tagName}>#{tagName}</span>)
            })}
          </div>
          <div className={styles.danmu}>
            <input value={this.state.newDmk} onChange={this.handleNewDmkChange} placeholder='发个友善的弹幕见证当下' />
            <Button type='primary' shape='circle' icon={<UpCircleOutlined />} size='large' onClick={this.handleSendDmk} loading={this.state.isSendingDmk} />
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.like}>
            <div className={styles['like-icon']} />
            <div className={styles['like-number']}>{likeCounts}</div>
          </div>
          <div className={styles.comment}>
            <div className={styles['comment-icon']} />
            <div className={styles['comment-number']}>{commentsCount}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
