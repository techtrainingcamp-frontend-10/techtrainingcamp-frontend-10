import React from 'react'
// import { Link } from 'react-router-dom'
import { getVideoList } from '../../api/video'
import VideoPlayer from '../../components/VideoPlayer'
import { IVideo } from '../../types/video'
import Top from './Top'
import './index.scss'

interface IProps {
}

interface IState {
  videoList: Array<IVideo>;
}

class Home extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    this.state = {
      videoList: []
    }
  }

  async componentDidMount () {
    try {
      const res = await getVideoList()
      console.log(res)
      this.setState({
        videoList: res.data.videoList
      })
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    const video = this.state.videoList[0]

    return (
      <div className='home'>
        <Top />
        {video && <VideoPlayer video={video} />}
      </div>
    )
  }
}

export default Home
