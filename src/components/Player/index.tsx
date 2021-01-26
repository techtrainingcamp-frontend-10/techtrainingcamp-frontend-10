import React from 'react'
import XGPlayer from 'xgplayer'
import HlsPlayer from 'xgplayer-hls'
import './index.scss'
import classNames from 'classnames'

interface IProps {
  type: 'video'|'live';
  url: string;
}

class Player extends React.Component<IProps> {
  componentDidMount () {
    let player

    if (this.props.type === 'video') {
      player = new XGPlayer({
        id: 'mse',
        width: window.innerWidth,
        height: window.innerHeight,
        url: this.props.url,
        autoplay: true,
        videoInit: true,
        ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'pc', 'play', 'replay', 'volume']
      })
    } else if (this.props.type === 'live') {
      player = new HlsPlayer({
        id: 'mse',
        width: window.innerWidth,
        height: window.innerHeight,
        url: this.props.url,
        autoplay: true,
        videoInit: true,
        controls: false,
        ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'volume']
      })
    }

    console.log(player)
  }

  render () {
    const { type } = this.props
    return (
      <div className={classNames('player', { 'player-video': type === 'video', 'player-live': type === 'live' })}>
        <div id='mse' />
      </div>
    )
  }
}

export default Player
