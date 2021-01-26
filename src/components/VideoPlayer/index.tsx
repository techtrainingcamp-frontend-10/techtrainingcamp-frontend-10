import React from 'react'
import './index.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'

interface IProps {
  video: IVideo;
}

interface IState {
}

class VideoPlayer extends React.Component<IProps, IState> {
  render () {
    const { url } = this.props.video

    return (
      <div className='video'>
        <Player url={url} type='video' />
      </div>
    )
  }
}

export default VideoPlayer
