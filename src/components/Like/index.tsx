import classNames from 'classnames'
import { useState } from 'react'
import { likeVideo } from '../../api/video'
import styles from './index.module.scss'

interface IProps {
  videoId: number;
  num: number;
  onLiked: Function;
}

function like (props: IProps) {
  const [liked, setLiked] = useState(false)

  async function handleClick () {
    if (liked) return

    setLiked(true)
    props.onLiked(props.videoId)

    try {
      await likeVideo({ videoId: props.videoId })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.like} onClick={handleClick}>
      <div className={classNames(styles['like-icon'], { [styles.liked]: liked })} />
      <div className={styles['like-number']}>{props.num}</div>
    </div>
  )
}

export default like
