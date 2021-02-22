import React from 'react'
import './index.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'

interface IProps {
  video: IVideo;
  active?: boolean;
}

interface IState {
}

class LivePlayer extends React.Component<IProps, IState> {
  render () {
    const { _id, videoId, url } = this.props.video
    const { active } = this.props

    return (
      <div className='live'>
        <Player _id={_id} id={videoId} url={url} type='live' active={active} />
      </div>
    )
  }
}

export default LivePlayer
