import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import classNames from 'classnames'
import { Button } from 'antd'
import { UpCircleOutlined } from '@ant-design/icons'
import VliveComment from '../Vlivecomment'
import axios from 'axios'
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
    axios.post('https://qcmt57.fn.thelarkcloud.com/createDanmuku', {
      userId: '1612779773437',
      vedioId: '602113570d5dfa02d0d87008',
      content: this.state.newDmk,
      size: 20,
      start: this.state.timeStamp,
      color: '#001835',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNjEyNzc5NzczNDM3IiwiaWF0IjoxNjEyNzgwMDE0fQ.J27ujArwYmr2b7Muv2wI3FEs1YbXO8Ce2llju6dMzjo'
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

  render () {
    const { id, url, author, description, tagList, likes, comments } = this.props.video
    const { active } = this.props

    return (
      <div className={classNames(styles.video, { 'video-avtice': active })}>
        <Player id={id.toString()} url={url} type='video' active={active} onTimeChange={this.handleTimeChange} onRef={(c:any) => { this.ChildPlayer = c }} />
        <div className={styles.info}>
          <div className={styles.liveComents}>
            <VliveComment />
          </div>
          <div className={styles.author}>
            @{author}
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
            <div className={styles['like-number']}>{likes}</div>
          </div>
          <div className={styles.comment}>
            <div className={styles['comment-icon']} />
            <div className={styles['comment-number']}>{comments}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
