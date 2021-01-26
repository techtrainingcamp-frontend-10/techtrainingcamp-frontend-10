import React from 'react'
import styles from './index.module.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'

interface IProps {
  video: IVideo;
}

interface IState {
}

class VideoPlayer extends React.Component<IProps, IState> {
  render () {
    const { url, author, description, tagList, likes, comments } = this.props.video

    return (
      <div className={styles.videl}>
        <Player url={url} type='video' />
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
