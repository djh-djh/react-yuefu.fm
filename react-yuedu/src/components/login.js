import React from 'react'
import '../css/reg.css'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:null,
            password:null
        }
    }
    close(){
        document.getElementsByClassName('box')[0].classList.add('lea')
        setTimeout(()=>{
            document.getElementById('body').style.overflow='auto'
            this.props.clo(false)
        },500)
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
        if(this.state.email && this.state.password){
            React.axios.post('http://localhost:3000/api/user/login',{
                email:this.state.email,
                password:this.state.password
            }).then(res=>{
                console.log(res)  
                if(res.data.res_code===200){
                    sessionStorage.token=res.data.res.token
                    sessionStorage.nikiname=res.data.res.user.nikiname
                    this.close()
                }else{
                    alert('邮箱、密码错误')
                }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            alert('请完整输入！！！')
        }
        document.getElementsByTagName('input')[1].value=''
        document.getElementsByTagName('input')[2].value=''
    }
    render(){
        return(
            <div className={this.props.open1?'reg':'reg clo'}>
                {this.props.open}
                <div className='box box1'>
                    <h2>登录<i className='iconfont icon-guanbi close' onClick={this.close.bind(this)}></i></h2>
                    <div>
                       <input tpye='text' placeholder='邮箱' onChange={(e)=>this.Email(e)}></input>  
                       <input type='password' placeholder='密码' onChange={
                            (e)=>this.Password(e)
                       }></input>  
                    </div>
                    <p><input type='checkbox' /> 下次自动登录<span className='farget'>忘记密码</span></p>
                    <button onClick={this.submit.bind(this)}>登录</button>
                </div>
            </div>
        )
    }
}
export default Login