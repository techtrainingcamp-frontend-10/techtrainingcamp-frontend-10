import React from 'react'
import { getLiveList } from '../../api/live'
import LivePlayer from '../../components/LivePlayer'
import { IVideo } from '../../types/video'

interface IProps {
}

interface IState {
  liveList: Array<IVideo>;
}

class Live extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    this.state = {
      liveList: []
    }
  }

  async componentDidMount () {
    try {
      const res = await getLiveList()
      console.log(res)
      this.setState({
        liveList: res.data.liveList
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const live = this.state.liveList[0]

    return (
      <div className='live'>
        {live && <LivePlayer video={live} />}
      </div>
    )
  }
}

export default Live
