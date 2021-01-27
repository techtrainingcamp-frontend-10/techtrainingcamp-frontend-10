import React from 'react'
import XGPlayer from 'xgplayer'
import HlsPlayer from 'xgplayer-hls'
// import DPlayer from 'dplayer'
import './index.scss'
import classNames from 'classnames'

interface IProps {
  type: 'video'|'live';
  id: string;
  url: string;
  active?: boolean;
}

interface IState {
}

class Player extends React.Component<IProps, IState> {
  player: XGPlayer | undefined

  initPlayer () {
    const { type, id, url } = this.props

    if (type === 'video') {
      this.player = new XGPlayer({
        id: `${type}${id}`,
        width: window.innerWidth,
        height: window.innerHeight,
        url: url,
        autoplay: true,
        videoInit: true,
        'x5-video-player-type': 'h5',
        playsinline: false,
        loop: true,
        closeVideoStopPropagation: true, // 允许事件冒泡
        closePlayVideoFocus: true, // 关闭自动 focus（与 swiperjs 冲突）
        ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'pc', 'play', 'replay', 'volume']
      })
    } else if (type === 'live') {
      this.player = new HlsPlayer({
        id: id,
        width: window.innerWidth,
        height: window.innerHeight,
        url: url,
        autoplay: true,
        videoInit: true,
        controls: false,
        'x5-video-player-type': 'h5',
        playsinline: false,
        closeVideoStopPropagation: true,
        closePlayVideoFocus: true,
        ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'volume']
      })
    }

    console.log(`[${id}] Player inited.`, this.player)
  }

  componentDidMount () {
    const { active } = this.props

    if (active) {
      this.initPlayer()
    }
  }

  componentDidUpdate () {
    const { id, active } = this.props

    console.log(`[${id}] Player updated.`, this.player, active)

    if (active) {
      if (!this.player) {
        this.initPlayer()
      }
    } else {
      if (this.player) {
        this.player.destroy()
        delete this.player
        console.log(`[${id}] Player destroyed.`, this.player)
      }
    }
  }

  render () {
    const { id, type } = this.props

    return (
      <div className={classNames('player', { 'player-video': type === 'video', 'player-live': type === 'live' })}>
        <div id={`${type}${id}`} />
      </div>
    )
  }
}

export default Player
