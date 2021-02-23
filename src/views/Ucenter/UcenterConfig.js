import React from 'react'
import axios from 'axios'
import './UcenterConfig.scss'
import { PageHeader } from 'antd'

class UcenterConfig extends React.Component{
  render(){
    retrun (
      actDOM.render(
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Title"
          subTitle="This is a subtitle"
        />
    )
  }
}