import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

interface IProps {
}

interface IState {
}

class Top extends React.Component<IProps, IState> {
  render () {
    return (
      <div className={styles.top}>
        <div className={styles.left}>
          <Link to='/live'>
            <div style={{ color: '#ffffff' }}>直播</div>
          </Link>
        </div>
        <div className={styles.middle}>
          <div className={styles.navbar}>
            <Link to='/mypage'>
              <div className={styles['navbar-item']} style={{ color: '#ffffff' }}>我</div>
            </Link>
            <div className={styles['navbar-item']}>关注</div>
            <div className={`${styles['navbar-item']} ${styles['navbar-item-active']}`}>推荐</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles['search-btn']} />
        </div>
      </div>
    )
  }
}

export default Top
