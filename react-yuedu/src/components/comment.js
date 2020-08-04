import React from 'react'
import '../css/Comment.css'

class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            txt:null,
            comment:[],
            none:false
        }
    }
    componentWillReceiveProps(newProps){
        this.getComment(newProps.article_id)
    }
    //获取评论列表
    getComment(id){
        React.axios.get('http://localhost:3000/api/comments/'+id+'/page/1').then((res)=>{
            console.log(res.data.res)
            if(res.data.res_code===200){
                this.setState({
                    comment:res.data.res,
                    none:false
                })
            }
            if(res.data.res_code===400){
                this.setState({
                    none:true,
                    comment:[]
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    change(e){
        this.setState({
            txt:e.target.value
        })
    }
    //添加评论
    submit(){
        if(sessionStorage.nikiname){
            if(this.state.txt){
                React.axios.post('http://localhost:3000/api/comment',{
                article_id:this.props.article_id,
                content:this.state.txt
                },{
                    headers:{
                            Authorization:`Bearer ${sessionStorage.token} `
                        }
                }).then((res)=>{
                    console.log(res)
                    this.getComment(this.props.article_id)
                    alert('评论成功！！！')
                }).catch((err)=>{
                    console.log(err)
                })
                document.getElementById('txt').value=''
            }else{
                alert("内容不能为空！！！")
            }
        }else{
            alert('请先登录，再进行评论!')
        }
    }
    //删除
    del(id){
        React.axios.delete('http://localhost:3000/api/comment/'+id,{ 
                headers:{
                    Authorization:`Bearer ${sessionStorage.token} `
                }    
            }).then((res)=>{
                console.log(res)
                this.getComment(this.props.article_id)
            }).catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return(
            <div className='comment'>
                <div className='commTit'>
                    <input id='txt' type='text' placeholder='说点什么吧！' onChange={(e)=>this.change(e)}></input> <button onClick={this.submit.bind(this)}>评论</button>
                </div>
                <div className='commCon'>
                    <p>最新评论(<span>{this.state.comment.length}</span>)</p>
                    <ul>
                        <li className={this.state.none?'none':'hide'}>暂无评论</li>
                        {
                            this.state.comment.map((item,index)=>
                                <li key={index}>
                                    <p>{item.nikiname} <span>{item.reply_time}</span></p>
                                    <p>{item.content}</p>
                                    <button onClick={()=>this.del(item.id)} className={sessionStorage.nikiname===item.nikiname?'':'hide'}>删除</button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default Comment