import React from 'react'
import { Form, Input, Button, Checkbox, Avatar, Select, Tooltip, DatePicker, Divider, Upload, message, Alert } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, QrcodeOutlined, AntDesignOutlined, LoadingOutlined, PlusOutlined, EnvironmentFilled, ContactsFilled } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import './Ucenter.scss'
import PropTypes from 'prop-types'
import { setToken, setUserId } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
const { Option } = Select

class UserCenterCardLogin extends React.Component {
  handleTriggerQR () {
    console.log('QRCode is unavaliable now')
  }

  render () {
    return (
      <div className={`usercenter-card -front ${this.props.mode === 'login' ? 'show' : 'hide'} `}>
        <div className='usercenter-card-focus' />
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-login-header'>
            <div className='usercenter-card-login-header_qrbtn' onClick={this.handleTriggerQR}>
              <QrcodeOutlined />
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 70, md: 70, lg: 80, xl: 80, xxl: 80 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <span className='usercenter-card-login-content_user'>{this.props.uname}</span>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardLogin.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  uname: PropTypes.string
}
class UserCenterCardLoginSucess extends React.Component {
  render () {
    return (
      <div className={`usercenter-card -back ${this.props.mode === 'loginSucs' ? 'show' : 'hide'}`}>
        <div className='usercenter-card-focus' />
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-login-header'>
            <div className='usercenter-card-login-header_info'>
              {/* <div style={{"color":"white"}}>新年快乐</div> */}
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <span className='usercenter-card-login-content_user'>{this.props.uname}</span>
            <span className='usercenter-card-login-content_info'>欢迎回来，正在跳转...</span>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardLoginSucess.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  uname: PropTypes.string
}
class UserCenterCardRegi extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  hadleTriggerQR () {
    console.log('QRCode is unavaliable now')
  }

  render () {
    return this.props.mode === 'regi' && (
      <div className='usercenter-card -register'>
        <div className='usercenter-card-background'>
          <img
            src={this.props.bg} className='usercenter-card__bg'
          />
        </div>
        <div className='usercenter-card-wrapper'>
          <div className='usercenter-card-regi-header'>
            <div className='usercenter-card-regi-header-info' onClick={this.handleTriggerQR}>
              <div className='item'><ContactsFilled />{this.props.ages}</div>
              <div className='item'><EnvironmentFilled />{this.props.local}</div>
            </div>
            <img className='usercenter-card-login-header_logo' src='//sf3-ttcdn-tos.pstatp.com/obj/ttfe/passport/sso/douyin/douyin-logo_1576745941218.png' alt='logo' />

          </div>
          <div className='usercenter-card-login-content'>
            <Avatar
              size={{ xs: 70, sm: 40, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={this.props.avatar}
              icon={<AntDesignOutlined />}
            />
            <text className='usercenter-card-login-content_user'>林治</text>
          </div>
        </div>
      </div>
    )
  }
}
UserCenterCardRegi.propTypes = {
  mode: PropTypes.string,
  bg: PropTypes.string,
  avatar: PropTypes.string,
  ages: PropTypes.string,
  local: PropTypes.string
}
class UserCenterFormRegi extends React.Component {
  regiFormRef = React.createRef();
  constructor (props) {
    super(props)
    this.state = { loaingAvatar: false, avatarUrl: '' }
    this.uploadButton.bind(this)
  }

  handleOnFinish = (values) => {
    console.log('Received values of form: ', values)
  };

  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  iconChange=({ info }) => {
    console.log(info.file)
  }

  getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  handleChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )
    }
  };

  uploadButton=() => (
    <div>
      {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  render () {
    return (
      <div className='usercenter-form-card'>
        <Form
          ref={this.formRef} name='control-ref' onFinish={this.handleOnFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86'
          }}
        >
          <Form.Item
            name='mail'
            label='邮箱'
            rules={[{ required: true, message: '请输入正确的邮箱地址' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='password'
            label='密码'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='确认密码'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='nickname'
            label={
              <span>
                昵称&nbsp;
                <Tooltip title='注册之后可以随时在个人中心修改'>
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
        }
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Divider orientation='left'>个性信息</Divider>
          <Form.Item
            name='birthday'
            label='生日'
          >
            <ImgCrop rotate>
              <Upload
                name='avatar'
                listType='picture-card'
                className='avatar-uploader'
                showUploadList={false}
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt='avatar' style={{ width: '100%' }} /> : this.uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item
            name='birthday'
            label='生日'
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name='regin'
            label='所在地'
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='gender'
            label='性别'
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              placeholder='请选择性别'
              allowClear
              style={{ width: '50%' }}
            >
              <Option value='male'>男</Option>
              <Option value='female'>女</Option>
              <Option value='other'>保密</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
          >
            {({ getFieldValue }) => {
              return getFieldValue('gender') === 'other'
                ? (
                  <Form.Item
                    name='customizeGender'
                    label='Customize Gender'
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  )
                : null
            }}
          </Form.Item>
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('注册用户需要先同意用户协议'))
              }
            ]}
            {...(this.tailFormItemLayout)}
          >
            <Checkbox>
              我已阅读并同意 <a href=''>用户协议</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...(this.tailFormItemLayout)}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
class UserCenterFormLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loading: false, disabled: false, showMsg: false, previewTimer: null }
  }

  previewGet= (user) => {
    axios.post('https://qcmt57.fn.thelarkcloud.com/userIconPreview', {
      user: user
    })
      .then(function (response) {
        if (!response.data.success) { throw (new Error()) }
        this.props.onCardUpdate(response.data)
      }.bind(this))
      .catch(function (error) {
        console.log(error)
        this.props.onCardReset()
      }.bind(this))
  }

  handlePreview=(e) => {
    if (this.state.previewTimer) { clearTimeout(this.state.previewTimer) }
    const newTimer = setTimeout(function () {
      this.previewGet(e.target.value)
    }.bind(this), 400)
    this.setState({ previewTimer: newTimer })
  }

  handleLogin = (loginData) => {
    console.log(loginData)
    this.setState({ loading: true, showMsg: false })
    axios.post('https://qcmt57.fn.thelarkcloud.com/login', {
      userName: loginData.username,
      password: loginData.password
    })
      .then(function (response) {
        console.log(response)
        this.setState({ loading: false, disabled: true })
        if (!response.data.success) { throw (new Error('login failed')) }
        setToken(response.data.token) // save token to local
        setUserId(response.data.userId)
        this.props.onModechange('loginSucs')
        console.log(this.props)
        this.props.onLoginSuccess()
      }.bind(this))
      .catch(function (error) {
        this.setState({ loading: false, showMsg: true })
        console.log(error)
      }.bind(this))
  }

  render () {
    return (
      <div className='usercenter-form-card usercenter-form-login'>
        {this.state.showMsg ? (<Alert message='帐号/密码错误，请确认后重试' type='error' showIcon />) : ''}
        <Form
          name='normal_login'
          id='usercenter-form-card-content'
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={this.handleLogin}
          requiredMark={false}
        >
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='邮箱/用户名' onChange={this.handlePreview} />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              className='input'
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='账号密码'
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item style=''>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <a className='login-form-forgot' href=''>
              忘记密码?
            </a>
          </Form.Item>
          <div className='login-form-btn'>
            <Form.Item class='login-btn' noStyle>
              <Button type='primary' htmlType='submit' loading={this.state.loading} disabled={this.props.mode !== 'login'}>
                登录
              </Button>
            </Form.Item>
          </div>
          <div className='login-form-footer'>
            <Form.Item>
              或 <a href=''>现在注册</a>
            </Form.Item>
          </div>
        </Form>
      </div>
    )
  }
}
UserCenterFormLogin.propTypes = {
  onCardUpdate: PropTypes.func,
  onCardReset: PropTypes.func,
  onModechange: PropTypes.func,
  mode: PropTypes.string,
  onLoginSuccess: PropTypes.func
}

class UserCenterForm extends React.Component {
  constructor (props) {
    super(props)
    const defaultAvatar = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/0bb96d4c05cc0a53_1612876378525.jpeg'
    const defaultBg = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/34d55516367c98c2_1612876325199.png'
    this.state = { mode: 'login', cardBg: defaultBg, avatar: defaultAvatar, uname: '抖音', ages: '小鲜肉', local: '地球村' }
  }

  handleChangeMode = (mode) => {
    this.setState({ mode: mode })
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values)
  };

  handleResetLoginCard=() => {
    const defaultAvatar = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/0bb96d4c05cc0a53_1612876378525.jpeg'
    const defaultBg = 'https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/34d55516367c98c2_1612876325199.png'
    this.setState({ cardBg: defaultBg, avatar: defaultAvatar })
  }

  handleSetLoginCard = (props) => {
    this.setState({ cardBg: props.data.bgImg, uname: props.data.uname, avatar: props.data.avatar })
  }

  handleLoginSuccess = () => {
    setTimeout(() => {
      this.props.history.push('/')
    }, 1000)
  }

  render () {
    let formItem = {}
    switch (this.state.mode) {
      case 'login':
      case 'loginSucs':
        formItem = <UserCenterFormLogin onLoginSuccess={this.handleLoginSuccess} mode={this.state.mode} onCardUpdate={this.handleSetLoginCard} onCardReset={this.handleResetLoginCard} onModechange={this.handleChangeMode} />
        break
      case 'regi':
      case 'regiSucs':
        formItem = <UserCenterFormRegi />
    }
    return (
      <div className='usercenter-wrapper'>
        <div className='card-item'>
          <UserCenterCardLogin mode={this.state.mode} avatar={this.state.avatar} uname={this.state.uname} bg={this.state.cardBg} />
          <UserCenterCardLoginSucess mode={this.state.mode} bg={this.state.cardBg} avatar={this.state.avatar} uname={this.state.uname} />
          <UserCenterCardRegi mode={this.state.mode} bg={this.state.cardBg} avatar={this.state.avatar} uname={this.state.uname} ages={this.state.ages} local={this.state.local} />
        </div>
        {formItem}
      </div>
    )
  }
}
UserCenterForm.propTypes = {
  history: PropTypes.object
}

class UserCenter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <>
        <UserCenterForm history={this.props.history} />
      </>
    )
  }
}
UserCenter.propTypes = {
  history: PropTypes.object
}

const ucenter = () => {
  const history = useHistory()
  return (
    <>
      <video id='ucenterBgVedio' playsInline autoPlay muted loop src='https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qcmt57/cbbf7b1a02c400d6_1612887218358.mp4' data-object-fit='true' type='video/mp4' poster='https://sf1-scmcdn-tos.pstatp.com/goofy/ies/douyin_home_web/imgs/1.9e1ce889.jpg'>抱歉，您的浏览器不支持内嵌视频</video>
      <div className='wrapper'>
        <UserCenter history={history} />
      </div>
    </>
  )
}

export default ucenter
