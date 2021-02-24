import React from 'react'
import { getLiveList } from '../../api/live'
import LivePlayer from '../../components/LivePlayer'
import { IVideo } from '../../types/video'
import Top from './Top'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperClass from 'swiper/types/swiper-class'
import 'swiper/swiper.scss'

interface IProps {
}

interface IState {
  liveList: Array<IVideo>;
  inPageLiveList: Array<IVideo>;
  activeIndex: number;
}

class Live extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props)

    this.state = {
      liveList: [],
      inPageLiveList: [],
      activeIndex: 0
    }
  }

  async componentDidMount () {
    try {
      const res = await getLiveList()
      const liveList: Array<IVideo> = res.data.success.list
      this.setState({
        liveList
      })
      this.setState({
        inPageLiveList: liveList.slice(0, 2)
      })
    } catch (e) {
      console.log(e)
    }
  }

  handleSwiperChange = (swiper: SwiperClass) => {
    console.log(swiper)
    const { liveList, inPageLiveList } = this.state
    const { activeIndex } = swiper
    if (activeIndex === inPageLiveList.length - 1 && activeIndex < liveList.length - 1) {
      this.setState({
        inPageLiveList: [...inPageLiveList, liveList[activeIndex + 1]]
      })
      swiper.update()
    }
    this.setState({
      activeIndex: activeIndex
    })
  }

  render () {
    const { inPageLiveList, activeIndex } = this.state

    return (
      <div className='live'>
        <Top />
        {inPageLiveList && inPageLiveList.length &&
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
            {inPageLiveList.map((video, index) => {
              return (
                <SwiperSlide key={video._id}>
                  <LivePlayer video={video} active={activeIndex === index} />
                </SwiperSlide>
              )
            })}
          </Swiper>}
      </div>
    )
  }
}

export default Live
