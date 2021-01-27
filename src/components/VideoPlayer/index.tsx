import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import classNames from 'classnames'

interface IProps {
  video: IVideo;
  active?: boolean;
}

interface IState {
}

class VideoPlayer extends React.Component<IProps, IState> {
  render () {
    const { id, url, author, description, tagList, likes, comments } = this.props.video
    const { active } = this.props

    return (
      <div className={classNames(styles.video, { 'video-avtice': active })}>
        <Player id={id.toString()} url={url} type='video' active={active} />
        <div className={styles.info}>
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
