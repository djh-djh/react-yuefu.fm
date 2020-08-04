import React from 'react'
import '../css/Footer.css'

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <div className='heart'>
                    <div className='left'>
                        <p>关于我们 | 加入我们</p>
                        <p>@2010-2016 Yuedu.fm All rights reserve 粤ICP备14076392号</p>
                    </div>
                    <div className='right'>
                        <div>
                           <i className='iconfont icon-juan'></i> 
                        </div>
                        <div>
                           <i className='iconfont icon-weixin1'></i> 
                        </div>
                        <div>
                           <i className='iconfont icon-weibo'></i> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer