import React from 'react'
import '../css/List.css'
import Img from '../img/index.jpg'
import {Link,withRouter} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],//数据
            pageArr:[1,2,3,4,5,6],//分页数组
            page:1
        }
    }
    componentDidMount(){
        this.getData(this.props.match.params.type,this.state.page)
    }
    componentWillReceiveProps(newProps){
        this.getData(newProps.match.params.type,this.state.page)
    }
    getData(n=1,p){
        React.axios.get('http://localhost:3000/api/articles/'+n+'/page/'+p).then(res=>{
            this.setState({
                data:res.data.res.articles
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    //分页
    Page(i){
       this.demo(i)
    }
    //后退
    pagePrev(){
        this.demo(this.state.page)
        if(this.state.page !== 1){
            this.setState({
                page:this.state.page-1
            })
        }
    }
    //前进
    pageNext(){
       this.demo(this.state.page)
        this.setState({
            pageArr:this.state.pageArr,
            page:this.state.page+1
        })
    }
    //分页函数
    demo(i){
         //当点击左边的页数，页数数组减少
         if(i===this.state.pageArr[0] && this.state.pageArr[0]!==1){
            this.state.pageArr.pop()
            this.state.pageArr.unshift(i-1)
        }
        //当点击最右边的页数，页数数组增加
        if(i===this.state.pageArr[5]){
            this.state.pageArr.shift()
            this.state.pageArr.push(i+1)
        }
        this.setState({
            pageArr:this.state.pageArr,
            page:i
        })
    }
    render(){
        return(
            <div className='leftCon'>
                {/* 列表内容 */}
                {
                    this.state.data.map((item,index)=>
                    <div key={index} className='li'>
                        <div className='img'>
                            <img src={Img} alt=''/>
                        </div>
                        <div className='liCon'>
                        <h3><Link to={'/app/detail/'+item.id}>{item.title}</Link></h3>
                        <p><span><i className='iconfont icon-bi '></i>{item.author}</span><span><i className='iconfont icon-huatong'></i>{item.podcast}</span><span><i className='iconfont icon-shijian'></i>{item.created_time}</span><span><i className='iconfont icon-erji'></i>{item.play_time}次</span></p>
                        <p>{item.content}</p>
                        </div>
                    </div>
                    )
                }
                {/* 分页 */}
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li>
                        <a href='#!' aria-label="Previous" onClick={this.pagePrev.bind(this)}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        {
                            this.state.pageArr.map((item,index)=>
                                <li key={index}><a href='#!' className={this.state.page===item?'gray':''} onClick={
                                    ()=>this.Page(item)
                                }>{item}</a></li>
                            )
                        }
                        <li>
                        <a href="#!" aria-label="Next" onClick={this.pageNext.bind(this)}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default withRouter(List) 