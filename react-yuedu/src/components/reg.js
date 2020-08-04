import React from 'react'
import '../css/reg.css'

class Reg extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nikiname:null,
            username:null,
            email:null,
            password:null,
        }
    }
    reg(){
        document.getElementsByClassName('box')[1].classList.add('lea')
        setTimeout(()=>{
            document.getElementById('body').style.overflow='auto'
            this.props.clo(false)
        },500)
    }
    Nikiname(e){
        this.setState({
            nikiname:e.target.value
        })
    }
    Username(e){
        this.setState({
            username:e.target.value
        })
    }
    Email(e){
        this.setState({
           email:e.target.value
        })
    }
    Password(e){
        this.setState({
            password:e.target.value
        })
    }
    submit(){
        console.log(this.state.nikiname,this.state.username,this.state.email,this.state.password)
        if(this.state.nikiname && this.state.username && this.state.email &&this.state.password){
             React.axios.post('http://localhost:3000/api/user',{
                nikiname:this.state.nikiname,
                username:this.state.username,
                email:this.state.email,
                password:this.state.password
            }).then((res)=>{
                if(res.data.res_code===200){
                    this.reg()
                    alert('注册成功')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            alert('输入不能为空')
        }
       
    }
    render(){
        return(
            <div  className={this.props.open2?'reg':'reg clo'}>
                <div className='box'>
                    <h2>注册<i className='iconfont icon-guanbi close' onClick={this.reg.bind(this)}></i></h2>
                    <div>
                       <input type='text' placeholder='用户昵称' onChange={(e)=>this.Nikiname(e)}></input>  
                       <input type='text'  placeholder='用户名' onChange={(e)=>this.Username(e)}></input>  
                       <input type='text' placeholder='用户邮箱' onChange={(e)=>this.Email(e)}></input>  
                       <input type='password' placeholder='用户密码' onChange={(e)=>this.Password(e)}></input>  
                    </div>
                    <p><input type='checkbox' /> 我已认真阅读并同意阅读Fm的<span>《使用协议》</span></p>
                    <button onClick={this.submit.bind(this)}>注册</button>
                </div>
            </div>
        )
    }
}
export default Reg