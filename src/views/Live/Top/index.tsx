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
        <div className={styles.left} />
        <div className={styles.middle} />
        <div className={styles.right}>
          <Link to='/'>
            <div className={styles['close-btn']} />
          </Link>
        </div>
      </div>
    )
  }
}

export default Top
