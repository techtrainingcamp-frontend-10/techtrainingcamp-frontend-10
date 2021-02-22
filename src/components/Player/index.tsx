import React from 'react'
import XGPlayer from 'xgplayer'
import HlsPlayer from 'xgplayer-hls'
// import DPlayer from 'dplayer'
import './index.scss'
import classNames from 'classnames'
import axios from 'axios'

interface IProps {
  type: 'video'|'live';
  id: number;
  _id: string;
  url: string;
  active?: boolean;
  onRef?: any;
  onTimeChange?: any;
}
interface DmkResponse{
  id: string,
  start: number,
  duration: number,
  prior: boolean,
  color: boolean,
  txt: string,
  style: any,
  mode: string
}
interface IState {
  dmkList: DmkResponse[]
}

class Player extends React.Component<IProps, IState> {
  player: XGPlayer | undefined
  constructor (props:IProps) {
    super(props)
    this.state = { dmkList: [] }
    if (props.onRef) {
      props.onRef(this)
    }
  }

  initPlayer () {
    const { type, id, _id, url } = this.props
    console.log('start')
    console.log(this.state.dmkList)
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
        ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'pc', 'play', 'replay', 'volume'],
        danmu: {
          comments: this.state.dmkList,
          area: {
            start: 0.3,
            end: 1
          }
        }
      })
      this.initDmk(_id, this.player)
      this.player.on('timeupdate', (e) => {
        this.props.onTimeChange(Math.round(parseFloat(e.maxPlayedTime) * 1000))
      })
    } else if (type === 'live') {
      this.player = new HlsPlayer({
        id: `${type}${id}`,
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

  initDmk (_id: string, player: any) {
    axios.post('https://qcmt57.fn.thelarkcloud.com/getDanmuku', { vedioId: _id }).then(response => {
      console.log(response.data.dmkList)
      this.setState({ dmkList: response.data.dmkList })
      response.data.dmkList.forEach((dmk: any) => {
        player.danmu.sendComment(dmk)
      })
      // player.danmu.comments = response.data.dmkList
    }).catch(err => console.log(err))
  }

  appendDmk (newDmk : any) {
    console.log('getDMK:', newDmk)
    this.player?.danmu.sendComment(newDmk)
  }

  componentDidMount () {
    const { active } = this.props

    if (active) {
      this.initPlayer()
    }
  }

  componentDidUpdate () {
    const { id, active } = this.props

    // console.log(`[${id}] Player updated.`, this.player, active)

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
