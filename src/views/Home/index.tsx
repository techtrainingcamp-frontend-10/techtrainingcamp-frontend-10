import React from 'react'
// import { Link } from 'react-router-dom'
import { getVideoList } from '../../api/video'
import Video from '../../components/Video'
import { IVideo } from '../../types/video'

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
      <div>
        {/* <Link to='/live'>Live</Link> */}
        {video && <Video video={video} />}
      </div>
    )
  }
}

export default Home
