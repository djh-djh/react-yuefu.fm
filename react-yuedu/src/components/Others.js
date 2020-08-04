import React from 'react'
import '../css/Other.css'
import {Link} from 'react-router-dom'

class Others extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            tit:null
        }
    }
    componentWillReceiveProps(newProps){
        if(this.props.typeid !== newProps.typeid){
            this.getType(newProps.typeid)
            this.getData(newProps.typeid)
        }
        
    }
    getType(n){
        React.axios.get('http://localhost:3000/api/types').then(res=>{
            this.setState({
                tit:res.data.res[n-1].type
            })
            }).catch(err=>{
                console.log(err)
            })
    }
    getData(i){
        React.axios.get('http://localhost:3000/api/articles/'+i+'/rand').then((res)=>{
            this.setState({
                data:res.data.res
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div className='other'>
                <div className='otherTop'>
                    <h4>{this.state.tit}频道其他节目</h4>
                    <div>
                        <Link to={'/app/index/'+this.props.typeid}>查看全部<i className='iconfont icon-zuojiantou-copy '></i></Link>
                    </div>
                </div>
                <ul>
                    {
                        this.state.data.map((item,index)=>
                            <li key={index}>
                                <p><Link to={'/app/detail/'+item.id}>{item.title}</Link></p>
                                <p>文:<span>{item.author}</span>
                                主播:<span>{item.podcast}</span>
                                </p>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}
export default Others