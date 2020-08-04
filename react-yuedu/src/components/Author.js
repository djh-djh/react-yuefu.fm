import React from 'react'
import head from '../img/head.jpeg'
import '../css/Author.css'

class Author extends React.Component{
    render(){
        return(
            <div className='author'>
                <div className='top'>
                    <div><img src={head} alt=''></img></div>
                    <div>
                        <h5>{this.props.author}<i className='iconfont icon-huatong'></i></h5>
                        <p>作品:7</p>
                        <p>粉丝:17</p>
                    </div>
                    <div><button>关注</button></div>
                </div>
                <div className='bottom'>
                    <span><i className='iconfont icon-dianzan'></i></span>0
                    <span><i className='iconfont icon-heart'></i></span>0
                    <span><i className='iconfont icon-shang1'></i></span>
                </div>
            </div>
        )
    }
}
export default Author