import React from 'react'
// import { Link } from 'react-router-dom'
import { getVideoList } from '../../api/video'
import VideoPlayer from '../../components/VideoPlayer'
import { IVideo } from '../../types/video'
import Top from './Top'
import './index.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.scss'

interface IProps {
}

interface IState {
  videoList: Array<IVideo>;
  inPageVideoList: Array<IVideo>;
  activeIndex: number;
}

class Home extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    this.state = {
      videoList: [],
      inPageVideoList: [],
      activeIndex: 0
    }
  }

  async componentDidMount () {
    try {
      const res = await getVideoList()
      const videoList: Array<IVideo> = res.data.success.list
      this.setState({
        videoList
      })
      this.setState({
        inPageVideoList: videoList.slice(0, 2)
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleSwiperChange = (swiper: SwiperClass) => {
    const { videoList, inPageVideoList } = this.state
    const { activeIndex } = swiper
    if (activeIndex === inPageVideoList.length - 1 && activeIndex < videoList.length - 1) {
      console.log('added')
      this.setState({
        inPageVideoList: [...inPageVideoList, videoList[activeIndex + 1]]
      })
      swiper.update()
    }
    console.log('Active swiper:', activeIndex)
    this.setState({
      activeIndex: activeIndex
    })
  }

  handleLiked = (video: IVideo) => {
    const videoItem = this.state.videoList.find(item => item === video)
    if (videoItem) videoItem.likeCounts++
  }

  render () {
    const { inPageVideoList, activeIndex } = this.state

    return (
      <div className='home'>
        <Top />
        {inPageVideoList && inPageVideoList.length &&
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            direction='vertical'
            onSlideChange={(swiper) => this.handleSwiperChange(swiper)}
            // onTouchStart={() => { console.log('onTouchStart') }}
            // onTouchMove={() => { console.log('onTouchMove') }}
            height={window.innerHeight}
            autoHeight
          >
            {inPageVideoList.map((video, index) => {
              return (
                <SwiperSlide key={video._id}>
                  <VideoPlayer video={video} active={activeIndex === index} onLiked={this.handleLiked} />
                </SwiperSlide>
              )
            })}
          </Swiper>}
      </div>
    )
  }
}

export default Home
