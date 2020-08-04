import React from 'react'
import '../css/detail.css'
import Author from'./Author'
import Else from './Else'
import Others from './Others'
import Comment from './comment'
import {Link} from "react-router-dom"

class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            con:{},//存放文章详情
            show:true,//判断文章是否收起
            labels:[],//标签数组
            typeId:null,//type类型
            id:null,//上一篇，下一篇
            data:[],//Elsez组件数据
        }
    }
    componentDidMount(){
        this.getData(this.props.match.params.id)
        this.getElse() 
    }
    componentWillReceiveProps(newProps){
        this.getData(newProps.match.params.id)
        this.getElse()
    }
    //详细数据
    getData(n){
         React.axios.get('http://localhost:3000/api/article/'+n).then(res=>{
            console.log(res.data.res)
            this.setState({
                con:res.data.res,
                labels:res.data.res.labels.split(","),
                typeId:res.data.res.type_id,
                id:res.data.res.id
            })
            sessionStorage.titid=res.data.res.type_id-1
        }).catch(err=>{
            console.log(err)
        })
    }
    //每次重新渲染数据的时候，调用数据传给Else组件
    getElse(){
        React.axios.get('http://localhost:3000/api/articles/rand').then((res)=>{
            this.setState({
                data:res.data.res
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    //展开全文
    show(){
        document.getElementsByClassName('detailTxt')[0].style.height='auto'
        this.setState({
            show:false
        })
    }
    //收起全文
    hide(){
        document.getElementsByClassName('detailTxt')[0].style.height='300px'
        this.setState({
            show:true
        })
    }
    render(){
        return(
            <div className='detailAll'>
                <div className='detail'>
                    <div className='detail-top'>
                        <h3>{this.state.con.title}</h3>
                        <div>
                        <p><span><i className='iconfont icon-bi'></i>{this.state.con.author}</span><span><i className='iconfont icon-huatong'></i>{this.state.con.podcast}</span><span><i className='iconfont icon-shijian'></i>{this.state.con.duration}</span></p>
                        <p>播放<span>{this.state.con.play_time}</span>次</p>
                        </div>
                        <audio  src='' controls>
                        </audio>
                    </div>
                    <div className='detail-bottom'>
                        <p className='detailTxt'>{this.state.con.content}</p>
                        <span className={this.state.show?'show':'hide'} onClick={this.show.bind(this)}>展开全文<i className='iconfont icon-jiantou9'></i></span>
                        <span className={this.state.show?'hide':'show'} onClick={this.hide.bind(this)}>收起全文<i className='iconfont icon-shang'></i></span>
                    </div>
                    <div className='detail-foot'>
                        <div>
                            <h5>标签:</h5>
                            {
                                this.state.labels.map((item,index)=>
                                    <span key={index}>{item}</span>
                                )
                            }
                        </div>
                        <div>
                            <i className='iconfont icon-weixin' style={{color:'green'}}></i>
                            <i className='iconfont icon-kongjian' style={{color:'skyblue'}}></i>
                            <i className='iconfont icon-weibo1' style={{color:'red'}}></i>
                        </div>
                    </div>
                    <div className='change'>
                            <p className='prev' ><Link to={'/app/detail/'+(this.state.id-1)}><i className='iconfont icon-zuojiantou'></i>上一篇</Link></p>
                            <p className='next'><Link to={'/app/detail/'+(this.state.id+1)}>下一篇<i className='iconfont icon-zuojiantou-copy'></i></Link></p>
                    </div>
                    <Comment article_id={this.state.id} />
                </div>
                <div className='detailR'>
                    <Author author={this.state.con.author} />
                    <Else  getElse={this.state.data}/>
                    <Others typeid={this.state.typeId}/>
                </div>
            </div>
        )
    }
}
export default List

