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
      url: this.props.url,
      fluid: true,
      autoplay: true,
      videoInit: true
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
