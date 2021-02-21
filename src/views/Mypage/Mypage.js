import React from 'react'
import { Image, Button, Typography, Tag, Tabs } from 'antd'
import { QrcodeOutlined, EnvironmentFilled, SmileFilled, HeartOutlined } from '@ant-design/icons'
import './Mypage.scss'
import PropTypes from 'prop-types'
const { Text } = Typography
const { TabPane } = Tabs
class MypageCover extends React.Component {
  render () {
    return (
      <div className='mypage-header-cover'>
        <img src='https://lh3.google.com/pw/ACtC-3d-0Y0LrGcsLGpyIE1aDGYp4NlkE9T9XCqRGjlw1arHe02U8xarBn1qQxusLMHLPUa1aoeMTTaiFwG8Q1KQPjS0brjyzR4=w973-h589-no?authuser=0' />
      </div>
    )
  }
}
const NumberInfo = ({ num, discribe }) => {
  return (
    <Text lcass='number-info'>
      <span className='number-info-num'>{num}</span>
      {discribe}
    </Text>

  )
}
NumberInfo.propTypes = {
  num: PropTypes.number,
  discribe: PropTypes.string
}
class MypagMainWorks extends React.Component {
  constructor (props) {
    super(props)
    this.state = { works: [{ id: 1, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 3, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 4, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 2, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }] }
  }

  render () {
    return (
      <>
        <div className='mypage-main-works'>
          {this.state.works.map((work, index) => {
            return (
              <div className='mypage-main-work-wrap' key={index}>
                <Image
                  src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                  preview={false}
                  placeholder={
                    <Image
                      preview={false}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200'
                    />
        }
                />
                <div className='label'><HeartOutlined /> 15</div>
              </div>
            )
          })}
        </div>
        <Text class='mypage-main-footer'>暂时没有更多了</Text>
      </>
    )
  }
}
class MypageMain extends React.Component {
  render () {
    return (
      <Tabs defaultActiveKey='work' centered animated={{ inkBar: true, tabPane: true }}>
        <TabPane tab='作品' key='work'>
          <MypagMainWorks />
        </TabPane>
        <TabPane tab='私密' key='priv'>
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab='喜欢' key='like'>
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    )
  }
}

class MypageInfo extends React.Component {
  handleShowQR () {
    console.log('showQr')
  }

  render () {
    return (
      <div className='mypage-info'>
        <div className='mypage-info-header'>
          <div className='mypage-info-header-avatar'>
            <img className='mypage-info-header-avatar-img' src='https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qczlhy/b012c32ab3565694_1612690513333.jpg' />
            <img className='mypage-info-header-avatar-ripon' src='https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qczlhy/05eb39872e3d553d_1612690489926.png' />
          </div>
          <Button style={{ 'max-width': '130px', 'margin-right': '10px', 'margin-left': 'auto' }} block>编辑资料<span style={{ color: 'grey' }}>25%</span></Button>
          <Button style={{ 'max-width': '80px' }} type='primary' block>找朋友</Button>
        </div>
        <div className='mypage-info-nickname'>林治</div>
        <div className='mypage-info-tikid'>抖音号:jhonlee<span onClick={this.handleShowQR}><QrcodeOutlined /></span></div>
        <div className='mypage-info-bio'>
          <Text>喵喵喵</Text>
        </div>
        <div className='mypage-info-tags'>
          <Tag icon={<EnvironmentFilled />} color='#55acee'>广东广州</Tag>
          <Tag icon={<SmileFilled />} color='#55acee'>00后</Tag>
        </div>
        <div className='mypage-number-wrapper'>
          <NumberInfo num={5} discribe='获赞' />
          <NumberInfo num={5} discribe='关注' />
          <NumberInfo num={5} discribe='粉丝' />
        </div>
      </div>
    )
  }
}
class Mypage extends React.Component {
  render () {
    return (
      <>
        <div className='mypage-wrapper'>
          <MypageCover />
          <MypageInfo />
        </div>
        <div className='mypage-main'>
          <MypageMain />
        </div>
      </>
    )
  }
}
export default Mypage
