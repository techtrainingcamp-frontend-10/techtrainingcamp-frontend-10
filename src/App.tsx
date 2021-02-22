import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import AuthRoute from './utils/router/authRoute'
import Home from './views/Home/index'
import Live from './views/Live/index'
import Ucenter from './views/Ucenter/Ucenter'
import Mypage from './views/Mypage/Mypage'
import Vcomment from './components/Vcomment/index'
import VliveComment from './components/Vlivecomment'

export default function BasicExample () {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <AuthRoute exact path='/' component={Home} />
          <AuthRoute path='/live' component={Live} />
          <Route path='/ucenter' history={history} component={Ucenter} />
          <AuthRoute path='/mypage' component={Mypage} />
          <Route path='/dev' component={Vcomment} videoId='1612780375771' />
          <Route path='/dev2' component={VliveComment} />
        </Switch>
      </div>
    </Router>
  )
}
