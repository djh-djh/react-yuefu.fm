import React from 'react'
import '../css/Else.css'
import {Link} from 'react-router-dom'

class Else extends React.Component{
    constructor(props){
        super(props)
        this.state={
            x:0,//移动的距离
        }
    }
    //点击向左滑
    prev(){
        if(this.state.x !== 0){
            this.state.x=this.state.x+300
             this.setState({
                 x:this.state.x
             })
             document.getElementById('elseUl').style.transform='translateX('+this.state.x+'px)' 
         }else{
             alert('到头了')
         }
    }
    // 点击右滑
    next(){
        if(this.state.x !== -1200 ){
           this.state.x=this.state.x-300
            this.setState({
                x:this.state.x
            })
            document.getElementById('elseUl').style.transform='translateX('+this.state.x+'px)' 
        }else{
            alert('没有了?')
        }
    }

    render(){
        return(
            <div className='else'>
                <div className='elseTop'>
                    <h4>其他相关节目</h4>
                    <div>
                        <i className='iconfont icon-zuojiantou i-prev' onClick={this.prev.bind(this)}></i>
                        <i className='iconfont icon-zuojiantou-copy i-next' onClick={this.next.bind(this)}></i>
                    </div>
                </div>
                <div className='elseBottom'>
                    <ul id='elseUl'>
                        {
                            this.props.getElse.map((item,index)=>
                                <li key={index}>
                                    <Link to={'/app/detail/'+item.id}>{item.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default Else