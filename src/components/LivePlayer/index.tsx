import React from 'react'
import './index.scss'
import Player from '../Player'
import { IVideo } from '../../types/video'
import Top from './Top'

interface IProps {
  video: IVideo;
}

interface IState {
}

class LivePlayer extends React.Component<IProps, IState> {
  render () {
    const { _id, url } = this.props.video

    return (
      <div className='live'>
        <Top />
        <Player id={_id} url={url} type='live' />
      </div>
    )
  }
}

export default LivePlayer
