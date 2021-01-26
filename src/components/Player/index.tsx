import React from 'react'
import XGPlayer from 'xgplayer'
import './index.scss'

interface Props {
  url: string;
}

class Player extends React.Component<Props> {
  componentDidMount () {
    const player = new XGPlayer({
      id: 'mse',
      width: window.innerWidth,
      height: window.innerHeight,
      url: this.props.url,
      autoplay: true,
      videoInit: true,
      ignores: ['time', 'definition', 'error', 'fullscreen', 'i18n', 'pc', 'play', 'replay', 'volume']
    })
    console.log(player)
  }

  render () {
    return (
      <div className='player'>
        <div id='mse' />
      </div>
    )
  }
}

export default Player
