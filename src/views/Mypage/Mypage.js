import React from 'react'
import { Image, Button, Typography, Tag, Tabs, message } from 'antd'
import { QrcodeOutlined, EnvironmentFilled, SmileFilled, HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './Mypage.scss'
import PropTypes from 'prop-types'
import { getUserInfo } from '../../api/userInfo'
const { Text } = Typography
const { TabPane } = Tabs
class MypageCover extends React.Component {
  render () {
    return (
      <div className='mypage-header-cover'>
        <img src={this.props.bgImg || 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/85cf033a8f890996_1614224071604.jpg'} />
      </div>
    )
  }
}
MypageCover.propTypes = {
  bgImg: PropTypes.string
}
const NumberInfo = ({ num, discribe }) => {
  return (
    <Text lcass='number-info'>
      <span className='number-info-num'>{num || '-'}</span>
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
    this.state = { userInfo: {}, works: [{ id: 1, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 3, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 4, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }, { id: 2, src: 'https://lh3.google.com/pw/ACtC-3fmxFDDRSNKZqDDfvml85Vz7BjfkZOeTN2ePOw_JhdFe1ezWToyZ5OTvlkHgkgUxBfGyKpgWZcsOV50fYl_bDp99Y1V0UE=w749-h799-no?authuser=0', Date: 'Mon Feb 08 2021 23:25:04 GMT+0800 (中国标准时间)' }] }
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
        <Text className='mypage-main-footer'>暂时没有更多了</Text>
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
          <MypagMainWorks />
        </TabPane>
        <TabPane tab='喜欢' key='like'>
          <MypagMainWorks />
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
    console.log(this.props?.badgeItem)
    return (
      <div className='mypage-info'>
        <div className='mypage-info-header'>
          <div className='mypage-info-header-avatar'>
            <img className='mypage-info-header-avatar-img' src={this.props.avatar || 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/b651040049239b73_1614224320328.jpg'} />
            <img className='mypage-info-header-avatar-ripon' src={this.props?.badgeurl || 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/1fecdbf7a45a5e0e_1614224449021.png'} />
          </div>
          <Link to='/myBadge'> <Button style={{ maxWidth: '130px', marginRight: '45px', marginLeft: 'auto' }} block>编辑资料<span style={{ color: 'grey' }}>25%</span></Button></Link>
          <Link to='/ucenter'> <Button style={{ maxWidth: '80px' }} type='primary' block>登出</Button></Link>
        </div>
        <div className='mypage-info-nickname'>{this.props.userName}</div>
        <div className='mypage-info-tikid'>抖音号:jhonlee<span onClick={this.handleShowQR}><QrcodeOutlined /></span></div>
        <div className='mypage-info-bio'>
          <Text>{this.props.bio}</Text>
        </div>
        <div className='mypage-info-tags'>
          <Tag icon={<EnvironmentFilled />} color='#55acee'>{this.props.regin}</Tag>
          <Tag icon={<SmileFilled />} color='#55acee'>00后</Tag>
        </div>
        <div className='mypage-number-wrapper'>
          <NumberInfo num={this.props.liked} discribe='获赞' />
          <NumberInfo num={this.props.follow} discribe='关注' />
          <NumberInfo num={this.props.follower} discribe='粉丝' />
        </div>
      </div>
    )
  }
}

MypageInfo.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  regin: PropTypes.string,
  badgeItem: PropTypes.object,
  bio: PropTypes.string,
  liked: PropTypes.number,
  follow: PropTypes.number,
  follower: PropTypes.number,
  badgeurl: PropTypes.string
}
class Mypage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { userInfo: { userName: 'tiktok', bgImg: '', avatar: '', regin: '', badgeItem: {}, badgeurl: '', bio: '', liked: 5, follow: 5, follower: 5 }, bgImg: 'https://lh3.google.com/pw/ACtC-3d-0Y0LrGcsLGpyIE1aDGYp4NlkE9T9XCqRGjlw1arHe02U8xarBn1qQxusLMHLPUa1aoeMTTaiFwG8Q1KQPjS0brjyzR4=w973-h589-no?authuser=0' }
  }

  componentDidMount () {
    this.fetchUserInfo()
  }

  fetchUserInfo () {
    getUserInfo({
    })
      .then((response) => {
        let data = response.data
        if (!data.success) { return }
        data = data.data
        localStorage.setItem('myInfo', JSON.stringify(data))
        this.setState({ userInfo: data })
      })
      .catch((error) => {
        const data = localStorage.getItem('myInfo')
        data && this.setState({ userInfo: JSON.parse(data) })
        console.error(error)
        message.warning('与服务器连接失败', 10)
      })
  }

  render () {
    return (
      <>
        <div className='mypage-wrapper'>
          <MypageCover bgImg={this.state.userInfo.bgImg} />
          <MypageInfo {...this.state.userInfo} />
        </div>
        <div className='mypage-main'>
          <MypageMain />
        </div>
      </>
    )
  }
}
export default Mypage
