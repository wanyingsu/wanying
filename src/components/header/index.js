import React, { Component } from 'react'


import './index.less'
export default class index extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, admin</span>
                    <button className="header-top-right">退出</button>
                </div>
                <div className="header-bottom">
                    <h1>首页</h1>
                    <div className="header-bottom-right">
                        <span>2019</span>
                        <img src="" alt="tupia"></img>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
