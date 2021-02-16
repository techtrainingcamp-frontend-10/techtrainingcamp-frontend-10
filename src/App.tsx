import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './views/Home/index'
import Live from './views/Live/index'
import Ucenter from './views/Ucenter/Ucenter'
import Mypage from './views/Mypage/Mypage'
import Vcomment from './components/Vcomment/index'
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
/*
_____________________
login https://qingfuwu.cn/dashboard first to avoid cors error
id:yejiahao.tech
pswd:edwnXeu2ds
_____________________
*/
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
          <Route exact path='/' component={Home} />
          <Route path='/live' component={Live} />
          <Route path='/ucenter' component={Ucenter} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/dev' component={Vcomment} />
        </Switch>
      </div>
    </Router>
  )
}
